import {
  AbstractFormControls,
  PasswordControl,
  PrivateKeyControl,
  MnemonicControl,
  AbstractFormGroup
} from '@blockframes/ui';

export class RecoverFormControls extends AbstractFormControls{

  constructor() {
    super();

    this.controls =  {
      privateKey: new PrivateKeyControl(''),
      mnemonic: new MnemonicControl(''),
      password: new PasswordControl(''),
      confirm: new PasswordControl(''),
    };

    this.validators.push(this.checkPasswords());
    this.validators.push(this.requireMnemonicXorPrivateKey);

  }
}

export class RecoverForm extends AbstractFormGroup {
  protected form : AbstractFormControls;

  constructor(controls? : any, validators?: any ) {
    const f = new RecoverFormControls();
    super(
      controls !== undefined ? controls : f.controls,
      validators !== undefined ? validators : f.validators
    );
    this.form = f;
  }
}
