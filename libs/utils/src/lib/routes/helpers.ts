import { Router } from "@angular/router";
import { initial } from "lodash";

/**
 * Returns the base url, that you can concatenate with
 * the rest of the url where you want to navigate.
 * @example this.router.navigate([`${getBaseUrl(this.router)}/${movie.id}/edit`])
 */
export function getBaseUrl(router: Router) {
  return initial(router.url.split('/')).join('/');
}
