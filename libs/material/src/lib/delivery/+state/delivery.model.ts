import { Stakeholder } from '@blockframes/movie';
import { firestore } from 'firebase/app';
type Timestamp = firestore.Timestamp;

export interface AbstractDelivery {
  id: string;
  movieId: string;
  validated: string[]; // Stakeholder.id[];
  delivered: boolean;
  stakeholders: Stakeholder[];
  steps: Step[] | StepDB[];
  dueDate?: Date | Timestamp;
  status: Status;
  isPaid: boolean;
  mustChargeMaterials?: boolean;
  mustBeSigned?: boolean;
  _type: 'deliveries';
}

export interface Delivery extends AbstractDelivery {
  dueDate?: Date;
  // Time to accept a material
  acceptationPeriod?: number,
  // Time to return a refused material
  reWorkingPeriod?: number,
  steps: Step[];
}

export interface DeliveryDB extends AbstractDelivery {
  dueDate?: Timestamp;
  steps: StepDB[];
}

interface AbstractStep {
  id: string;
  name: string;
  date: Date | Timestamp;
}

export interface Step extends AbstractStep {
  date: Date;
}

export interface StepDB extends AbstractStep {
  date: Timestamp;
}

export const enum Status {
  negociation = 'Delivery in negociation',
  pending = 'Materials pending',
  noa = 'NOA',
  nod = 'NOD',
  accepted = 'Materials accepted'
}

export function createDelivery(params: Partial<Delivery>) {
  return {
    validated: [],
    steps: [],
    status: Status.pending,
    isPaid: false,
    _type: 'deliveries',
    mustChargeMaterials: params.mustChargeMaterials || false,
    mustBeSigned: params.mustBeSigned || false,
    ...params
  } as Delivery;
}
