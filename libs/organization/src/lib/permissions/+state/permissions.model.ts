export interface Permissions {
  orgId: string;
  superAdmins: string[];
  admins: string[];
  canCreate: string[];
  canRead: string[];
  canUpdate: string[];
  canDelete: string[];
  userAppsPermissions?: AppPermissions[];
  userDocsPermissions?: UserDocPermissions[];
  orgDocsPermissions?: OrgDocPermissions[];
}

export interface AppPermissions {
  name: string;
  admins: string[];
  canCreate: string[];
  canRead: string[];
  canUpdate: string[];
  canDelete: string[];
}

export interface UserDocPermissions {
  id: string;
  admins: string[];
  canCreate: string[];
  canRead: string[];
  canUpdate: string[];
  canDelete: string[];
}

export interface OrgDocPermissions {
  id: string;
  owner: string;
  isAdmin: boolean;
  canCreate: boolean;
  canRead: boolean;
  canUpdate: boolean;
  canDelete: boolean;
}

export enum App {
  mediaDelivering,
  mediaFinanciers,
  storiesAndMore,
  biggerBoat
}

export interface AppInformations {
  name: string;
  collection: string;
}

export function getAppInformations(app: App): AppInformations {
  switch (app) {
    case App.mediaDelivering:
      return {name: 'Media Delivering', collection: 'mediaDelivering'};
    case App.mediaFinanciers:
      return {name: 'Media Financiers', collection: 'mediaFinanciers'};
    case App.storiesAndMore:
      return {name: 'Stories and More', collection: 'storiesAndMore'};
    case App.biggerBoat:
      return {name: 'Bigger Boat', collection: 'biggerBoat'}
  }
}

export function createPermissions(params: Partial<Permissions> = {}): Permissions {
  return {
    orgId: params.orgId,
    superAdmins: params.superAdmins,
    admins: [],
    canCreate: [],
    canRead: [],
    canUpdate: [],
    canDelete: [],
    ...params
  };
}

export function createAppPermissions(name: string): AppPermissions {
  return {
    name,
    admins: [],
    canCreate: [],
    canRead: [],
    canUpdate: [],
    canDelete: []
  };
}

export function createUserDocPermissions(docId: string): UserDocPermissions {
  return {
    id: docId,
    admins: [],
    canCreate: [],
    canRead: [],
    canUpdate: [],
    canDelete: []
  };
}

export function createOrgDocPermissions(docId: string, orgId: string): OrgDocPermissions {
  return {
    id: docId,
    owner: orgId,
    isAdmin: true,
    canCreate: true,
    canRead: true,
    canUpdate: true,
    canDelete: true
  };
}
