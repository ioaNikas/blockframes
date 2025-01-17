import { Movie } from '@blockframes/movie/movie/+state';

export function sortMovieBy(a: Movie, b: Movie, sortIdentifier: string) {
  switch (sortIdentifier) {
    case 'Title':
      return a.main.title.original.localeCompare(b.main.title.original);
    case 'Director':
      return a.main.directors[0].lastName.localeCompare(b.main.directors[0].lastName);
    case 'Production Year':
      if (b.main.productionYear < a.main.productionYear) {
        return -1;
      }
      if (b.main.productionYear > a.main.productionYear) {
        return 1;
      }
      return 0;
  }
}
