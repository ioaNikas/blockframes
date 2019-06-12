import { Validators } from '@angular/forms';
import {
  EntityControl,
  EntityForm,
  EmailControl,
  StringControl
} from '@blockframes/utils';

interface Profile {
  uid: string
  email: string
  firstName: string 
  lastName: string
  biography: string
}

function createControls(entity: Profile): EntityControl<Profile> {
  return {
    uid: new StringControl(entity? entity.uid : '', true),
    email: new EmailControl(entity? entity.email : '', true),
    firstName: new StringControl(entity? entity.firstName : '', false, [Validators.required]),
    lastName: new StringControl(entity? entity.lastName : '', false, [Validators.required]),
    biography: new StringControl(entity? entity.biography : ''),
  }
}

export class ProfileForm extends EntityForm<Profile> {
  constructor(data?: Profile) {
    super(createControls(data))
  }
}
