import { AbstractControl } from '@angular/forms';
import { staticModels } from '@blockframes/movie';

export function createLanguageValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const movieLanguageToLowerCase = staticModels['LANGUAGES']
    .map(key => key.label)
    .map(language => language.toLowerCase());
  return !movieLanguageToLowerCase.includes(control.value) ? { languageNotSupported: true } : null;
}
