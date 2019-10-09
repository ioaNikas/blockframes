export const enum OrganizationStatus {
  pending = 'pending',
  accepted = 'accepted'
}

/** Raw model of an organization */
export interface OrganizationRaw {
  id: string;
  userIds: string[];
  movieIds: string[];
  name: string;
  officeAddress: string;
  status: OrganizationStatus;
}
