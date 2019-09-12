import { DistributionRight } from './basket.model';
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
  currency: Currency;
}

export interface DistributionRight {
  id: string;
  movieId: string;
  medias: Media[];
  languages: Languages[];
  dubbings: Languages[];
  subtitles: Languages[];
  duration: {
    from: Date;
    to: Date;
  };
  territories: Territories[];
}

export interface CatalogBasket {
  id: string;
  status: BasketStatus;
  rights: DistributionRight[];
  price: Price;
}

export interface MovieData {
  id: string;
  movieName: string;
  endRights: string;
  territory: string;
  rights: string;
  languages: string;
  dubbed: string;
  subtitle: string;
}

/**
 * A factory function that creates Basket
 */
export function createBasket(basket: Partial<CatalogBasket> = {}) {
  return {
    id: basket.id,
    status: BasketStatus.pending,
    price: 0,
    rights: basket.rights,
    ...basket
  } as CatalogBasket;
}

export function createMovieDetails(details: Partial<MovieData> = {}) {
  return [
    {
      id: details.id,
      movieName: details.movieName,
      rights: details.rights,
      languages: details.languages,
      dubbed: details.dubbed,
      subtitle: details.subtitle,
      territory: details.territory,
      endRights: details.endRights,
      ...details
    } as MovieData
  ];
}

export function createBaseBasket(basket: Partial<CatalogBasket>) {
  return {
    status: BasketStatus.pending,
    price: 0,
    rights: basket.rights,
    ...basket
  } as CatalogBasket;
}

export function createDistributionRight(right: Partial<DistributionRight> = {}) {
  return {
    id: right.id,
    movieId: right.movieId,
    medias: right.medias,
    languages: right.languages,
    dubbings: right.dubbings,
    subtitles: right.subtitles,
    duration: {
      from: right.duration.from,
      to: right.duration.to
    },
    territories: right.territories
  } as DistributionRight;
} 