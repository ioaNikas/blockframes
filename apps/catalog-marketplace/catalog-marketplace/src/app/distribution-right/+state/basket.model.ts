import { staticModels } from '@blockframes/movie';

// TODO #818
type Languages = ((typeof staticModels)['LANGUAGES'])[number]['slug'];
type Currency = ((typeof staticModels)['MOVIE_CURRENCIES'])[number]['slug'];
type Media = ((typeof staticModels)['MEDIAS'])[number]['slug'];
export type Territories = ((typeof staticModels)['TERRITORIES'])[number]['slug'];

export const enum BasketStatus {
  pending = 'pending',
  submitted = 'submitted',
  accepted = 'accepted',
  paid = 'paid'
}

export interface Price {
  amount: number;
  currency: Currency
}
// @TODO(MF): Going to be needed in the slim version?
/* export interface DistributionLanguage {
  original: boolean;
  dubbed: boolean;
  subtitle: boolean;
} */

export interface DistributionRight {
  id: string;
  movieId: string;
  medias: Media[];
  languages: Languages[],
  dubbings: Languages[],
  subtitles: Languages[],
  duration: {
    from: Date,
    to: Date
  };
  territories: Territories[]
}

export interface CatalogBasket {
  status: BasketStatus;
  rights: DistributionRight[];
  price: Price;
}

/**
 * A factory function that creates Basket
 */
export function createBasket(basket: Partial<CatalogBasket> = {}) {
  return {
    status: BasketStatus.pending,
    price: 0,
    rights: [],
    ...basket
  } as CatalogBasket;
}
