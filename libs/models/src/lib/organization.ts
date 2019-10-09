export const enum OrganizationStatus {
  pending = 'pending',
  accepted = 'accepted'
}

export interface OrganizationRaw {
  id: string;
  userIds: string[];
  movieIds: string[];
  name: string;
  officeAddress: string;
  status: OrganizationStatus;
}

export interface Organization extends OrganizationRaw {
  id: string;
}
