import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IFormEntity } from 'app/contracts/IFormEntity';


@Injectable()
export class FormHelperService {
  constructor(private fb: FormBuilder) { }

  public buildForm(model: IFormEntity): FormGroup {
    const form = this.fb.group(model.getFormConfig());

    form.valueChanges
      .subscribe(data => this.onValueChanged(form, model.formErrors, model.validationMessages, data));

    this.onValueChanged(
      form,
      model.formErrors,
      model.validationMessages); // (re)set validation messages now

      return form;
  }

  private onValueChanged(form: FormGroup, formErrors: any, validationMessages: any, data?: any) {
    if (!form) { return; }
    // tslint:disable-next-line:forin
    for (const field in formErrors) {
      // clear previous error message (if any)
      formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = validationMessages[field];
        // tslint:disable-next-line:forin
        for (const key in control.errors) {
          formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

}