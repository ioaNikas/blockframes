import { CatalogBasket } from '@blockframes/marketplace';
/** Gives information about an application */
import { AppDetails } from '@blockframes/utils';
import { OrganizationRaw } from './organization-firestore.model';
export { OrganizationStatus } from './organization-firestore.model';

export const enum AppStatus {
  none = 'none', // no request nor accept.
  requested = 'requested',
  accepted = 'accepted'
}

/** An application details with the organization authorizations */
export interface AppDetailsWithStatus extends AppDetails {
  status: AppStatus;
}

export interface OrganizationMemberRequest {
  email: string;
  roles: string[];
}

export interface OrganizationMember extends OrganizationMemberRequest {
  uid: string;
  name?: string;
  surname?: string;
  avatar?: string;
  role?: UserRole;
}

export const enum UserRole {
  admin = 'admin',
  member = 'member'
}

export interface OrganizationOperation {
  id: string;
  name: string;
  quorum: number;
  members: OrganizationMember[];
}

export interface OrganizationAction {
  id: string;
  opId: string;
  name: string;
  signers: OrganizationMember[];
  isApproved: boolean;
  approvalDate?: string;
}

export interface Organization extends OrganizationRaw {
  phoneNumber: string;
  created: number;
  updated: number;
  templateIds: string[];
  members?: OrganizationMember[];
  operations?: OrganizationOperation[];
  actions?: OrganizationAction[];
  baskets: CatalogBasket[],
  logo?: string;
}


export interface OrganizationForm {
  name: string;
  adress: string;
}

export const PLACEHOLDER_LOGO = '/assets/logo/organisation_avatar_250.svg';

/**
 * A factory function that creates an Organization
 */
export function createOrganization(params: Partial<Organization> = {}): Organization {
  return {
    id: '',
    name: '',
    officeAddress: '',
    userIds: [],
    movieIds: [],
    templateIds: [],
    created: Date.now(),
    updated: Date.now(),
    actions: [],
    members: [],
    logo: PLACEHOLDER_LOGO,
    catalog: null,
    ...params
  } as Organization;
}


export function createOperation(operation: Partial<OrganizationOperation> = {}): OrganizationOperation {
  return {
    quorum: 0,
    members: [],
    ...operation,
  } as OrganizationOperation;
}
