// tslint:disable-next-line: interface-over-type-literal
export type Delivery = {
  id: string;
  movieId: string;
  validated: string[]; // Stakeholder.id[];
  delivered: boolean;
};


export function createDelivery(delivery: Partial<Delivery>) {
  return {
    id: delivery.id,
    movieId: delivery.movieId,
    validated: delivery.validated || [],
    delivered: delivery.delivered || false,
  } as Delivery;
}
