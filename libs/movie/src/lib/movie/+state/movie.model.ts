import { Organization } from "@blockframes/organization";

export interface Movie {
  id: string,
  org?: Organization,
  title: any, // will contain all titles: original, international, suiss, etc 
  directorName: string,
  poster: string,
  productionYear: number,
  types: string[],
  genres: string[],
  originCountry: string,
  coProducerCountries: string[],
  languages: string[],
  status: string,

  ipId: string,
  credits: {firstName: string, lastName: string, creditRole: string}[],
  isan: number,
  keywords: string[],
  logline: string,
  synopsis: string,
  directorNote: string,
  producerNote: string,
  promotionalElements: {promotionalElementName: string, url: string}[],
  goalBudget: number,
  movieCurrency: string,
  fundedBudget: number,
  breakeven: number,
  backendProfit: number,
  potentialRevenues: number,
  selectionCategories: string,
}

/**
 * A factory function that creates Movie
 */
export function createMovie(params?: Partial<Movie>) {
  return {
    ...params,
  } as Movie;
}
