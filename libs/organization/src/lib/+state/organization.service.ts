import { Injectable } from '@angular/core';
import {
  createOrganization,
  Organization,
  OrganizationMemberRequest,
  OrganizationAction,
  OrganizationMember,
  OrganizationOperation,
  OrganizationMemberRequest,
  OrganizationActionOld
} from './organization.model';
import { OrganizationStore } from './organization.store';
import { FireQuery } from '@blockframes/utils';
import { AuthService, AuthStore, User } from '@blockframes/auth';
import { OrganizationQuery } from './organization.query';
import {
  App,
  createAppPermissions,
  createPermissions,
  PermissionsQuery
} from '../permissions/+state';
import firebase from 'firebase';

@Injectable({ providedIn: 'root' })
export class OrganizationService {
  constructor(
    private store: OrganizationStore,
    private query: OrganizationQuery,
    private permissionsQuery: PermissionsQuery,
    private authStore: AuthStore,
    private authService: AuthService,
    private db: FireQuery
  ) {}

  /** Add a new user to the organization */
  public async addMember(member: OrganizationMemberRequest) {
    const orgId = this.query.getValue().org.id;
    // get a user or create a ghost user when needed:
    const { uid } = await this.authService.getOrCreateUserByMail(member.email); // TODO: limit the number of requests per organizations!

    // TODO: use a definitive data type
    // TODO: compare with backend-functions
    const invitation = { userId: uid, orgId, type: 'orgInvitation', state: 'pending' };

    await this.db.collection('invitations').add(invitation);

    return uid;
  }

  /**
   * Add a new organization to the database and create/update
   * related documents (permissions, apps permissions, user...).
   */
  public async add(organization: Organization, user: User): Promise<string> {
    const orgId: string = this.db.createId();
    const newOrganization: Organization = createOrganization({
      ...organization,
      id: orgId,
      userIds: [user.uid]
    });
    const organizationDoc = this.db.doc(`orgs/${orgId}`);
    const permissions = createPermissions({ orgId, superAdmins: [user.uid] });
    const permissionsDoc = this.db.doc(`permissions/${orgId}`);
    const userDoc = this.db.doc(`users/${user.uid}`);
    const apps: App[] = [App.mediaDelivering, App.mediaFinanciers, App.storiesAndMore];

    // Set permissions in the first transaction
    await this.db.firestore.runTransaction(tx =>
      Promise.all([
        // Set the new organization in permissions collection.
        tx.set(permissionsDoc.ref, permissions),
        // Initialize apps permissions documents in permissions apps sub-collection.
        ...apps.map(app => {
          const newApp = this.db.doc(`permissions/${orgId}/userAppsPermissions/${app}`);
          const appPermissions = createAppPermissions(app);
          return tx.set(newApp.ref, appPermissions);
        })
      ])
    );

    // Then set organization in the second transaction (rules from permissions will apply)
    await this.db.firestore
      .runTransaction(transaction => {
        const promises = [
          // Set the new organization in orgs collection.
          transaction.set(organizationDoc.ref, newOrganization),
          // Update user document with the new organization id.
          transaction.update(userDoc.ref, { orgId })
        ];
        return Promise.all(promises);
      })
      .catch(error => console.error(error));
    this.authStore.updateUser({ ...user, ...{ orgId } });
    return orgId;
  }

  public update(organization: Partial<Organization>) {
    const organizationId = this.query.getValue().org.id;
    this.db.doc(`orgs/${organizationId}`).update(organization);
  }

  /** Returns a list of organizations whose part of name match with @param prefix */
  public async getOrganizationsByName(prefix: string): Promise<Organization[]> {
    const call = firebase.functions().httpsCallable('findOrgByName');
    return call({ prefix }).then(matchingOrganizations => matchingOrganizations.data);
  }

  // TODO(#679): somehow the updateActiveMembers array don't filter correctly
  // the id out of the activeMembersArray.
  /* public async deleteActiveSigner(member: OrganizationMember) {
  public async deleteActiveSigner(member: OrganizationMember, action: OrganizationActionOld) {
    const organizationId = this.query.getValue().org.id;
    const actionData = await this.db.snapshot<OrganizationActionOld>(
      `orgs/${organizationId}/actions/${action.id}`
    );
    const updatedActiveMembers = actionData.activeMembers.filter(
      _member => _member.uid !== member.uid
    );
    return this.db
      .doc<OrganizationActionOld>(`orgs/${organizationId}/actions/${action.id}`)
      .update({ activeMembers: updatedActiveMembers });
  }*/
  
  //-------------------------------------------------
  //            BLOCKCHAIN PART OF ORGS
  //-------------------------------------------------

  /** create a newOperation, or update it if it already exists */
  private async upsertOperation(newOperation: OrganizationOperation) {
    const { operations } = this.query.getValue().org // get every actions
    const newOperations = operations.filter(currentOperation => currentOperation.id !== newOperation.id); // get all actions except the one we want to upsert

    // add the updated action to the action list
    newOperations.push(newOperation); // we could not use `actions.push(newAction)` direclty otherwise the action will have been duplicated

    try {
      // send tx to the org smart-contract and wait for result // TODO replace with the real implemntation : issue 676

      // update the store
      this.store.update(state => {
        return {
          ...state, // keep everything of the state
          org: { // update only the org
            ...state.org, // keep everything inside org
            operations: newOperations, // update only the actions array
          },
        }
      });
    } catch(err) {
      console.error('The transaction has failed :', err); // TODO better error handling : issue 671
    }
  }

  updateOperationQuorum(id: string, newQuorum: number) {
    const operation = this.query.getOperationById(id);
    if(!operation) throw new Error('This operation doesn\'t exists');
    const newOperation = {
      ...operation,
      quorum: newQuorum,
    };
    this.upsertOperation(newOperation);
  }

  addOperationMember(id: string, newMember: OrganizationMember) {
    const operation = this.query.getOperationById(id);
    if(!operation) throw new Error('This operation doesn\'t exists');
    
    const [memberExists] = operation.members.filter(member => member.uid === newMember.uid);
    if (!!memberExists) throw new Error('This member is already a signer of this operation');

    const newOperation = {
      ...operation,
      members: [...operation.members, newMember],
    };
    
    this.upsertOperation(newOperation);
  }

  removeOperationMember(id: string, memberToRemove: OrganizationMember) {
    const operation = this.query.getOperationById(id);
    if(!operation) throw new Error('This operation doesn\'t exists');
    
    const newMembersList = operation.members.filter(member => member.uid !== memberToRemove.uid);
    const newOperation = {
      ...operation,
      members: newMembersList,
    };
    
    this.upsertOperation(newOperation);
  }

  // TODO REMOVE THIS ASAP : issue 676
  public instantiateMockData() {
    const Alice: OrganizationMember = {
      avatar: 'https://fakeimg.pl/300/',
      name: 'Alice',
      uid: '0',
      email: 'alice@test.com',
      roles: []
    };
    const Bob: OrganizationMember = {
      avatar: 'https://fakeimg.pl/300/',
      name: 'Bob',
      uid: '1',
      email: 'bob@test.com',
      roles: []
    };
    const Charlie: OrganizationMember = {
      avatar: 'https://fakeimg.pl/300/',
      name: 'Charlie',
      uid: '2',
      email: 'charlie@test.com',
      roles: []
    };
    const David: OrganizationMember = {
      avatar: 'https://fakeimg.pl/300/',
      name: 'David',
      uid: '3',
      email: 'david@test.com',
      roles: []
    };
    const operations: OrganizationOperation[] = [
      { id: '0', name: 'Signing Delivery',  quorum: 2, members: [Alice, David] },
      { id: '1', name: 'Buying a Film',     quorum: 3, members: [Alice, Bob, Charlie] },
    ];
    const actions: OrganizationAction[] = [
      { id: '0', opid: '0', name: 'Delivery #123',    isApproved: false, signers: [Alice] },
      { id: '1', opid: '0', name: 'Delivery #456',    isApproved: true, signers: [Alice, David], approvalDate: '14/02/19' },
      { id: '2', opid: '0', name: 'Delivery #789',    isApproved: false, signers: [Alice] },
      { id: '3', opid: '1', name: 'Buy Parasite',     isApproved: true, signers: [Alice, Bob, Charlie], approvalDate: '14/02/19' },
      { id: '4', opid: '1', name: 'Buy Harry Potter', isApproved: false, signers: [Alice, Charlie] },
      { id: '5', opid: '1', name: 'Buy Rubber',       isApproved: true, signers: [Alice, Bob, Charlie], approvalDate: '14/02/19' },
      { id: '6', opid: '1', name: 'Buy LotR',         isApproved: true, signers: [Alice, Bob, Charlie], approvalDate: '14/02/19' },
    ]
    const mockOrgMembers: OrganizationMember[] = [Alice, Bob, Charlie, David];
    const oldOrgMembers = this.query.getValue().org.members;
    const newOrgMembers = mockOrgMembers.concat(oldOrgMembers);

    this.update({actions, operations, members: newOrgMembers});
  }
}
