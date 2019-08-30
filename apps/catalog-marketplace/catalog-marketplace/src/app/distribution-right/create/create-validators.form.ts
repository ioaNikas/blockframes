import { AbstractControl } from '@angular/forms';
import { staticModels } from '@blockframes/movie';

export function createLanguageValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const languages = staticModels['LANGUAGES'].map(key => key.label);
  return !languages.includes(control.value) ? { languageNotSupported: true } : null;
}
