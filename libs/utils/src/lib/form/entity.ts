import { FormControl, FormGroup, FormArray } from "@angular/forms";
import { rules } from "./validators";

// Generic Control 
export type EntityControl<T> = {
  [key in keyof T]: FormControl | FormArray
}

// Generic Entities
export class EntityForm<T> extends FormGroup {
  constructor(controls: EntityControl<T>, validators?: any) {
    super(controls, validators)
  }
}

export class EntityRulesForm<T> extends EntityForm<T> {
  public rules = rules;
  
  constructor(controls: EntityControl<T>, validators?: any) {
    super(controls, validators)
  }

  public getRules (ruleName: string) {
    return this.rules[ruleName];
  }
}