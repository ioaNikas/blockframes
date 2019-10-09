export const enum OrganizationStatus {
  pending = 'pending',
  accepted = 'accepted'
}

export interface Organization {
  id: string;
  userIds: string[];
  movieIds: string[];
  name: string;
  officeAddress: string;
  status: OrganizationStatus;
}
