import { AbstractControl } from '@angular/forms';
import { LANGUAGESLABEL } from '@blockframes/movie/movie/static-model/types';

export function languageValidator(control: AbstractControl): { [key: string]: boolean } | null {
  return !LANGUAGESLABEL.includes(control.value) ? { languageNotSupported: true } : null;
}
