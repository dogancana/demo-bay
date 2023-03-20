import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { isNonNullish } from 'src/app/utils/types';
import { FormSubmitValue } from '../models';
import { Input } from '@angular/core';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class RegistrationFormComponent {
  @Input()
  public loading = false;

  @Output()
  public formSubmit = new EventEmitter<FormSubmitValue>();

  constructor(private translate: TranslateService, private fb: FormBuilder) {}

  public PLACEHOLDER = {
    FIRSTNAME: this.translate.instant('register.firstnamePlaceholder'),
    LASTNAME: this.translate.instant('register.lastnamePlaceholder'),
    EMAIL: this.translate.instant('register.emailPlaceholder'),
    PASSWORD: this.translate.instant('register.passwordPlaceholder'),
  };
  public ERRORS = {
    REQUIRED: this.translate.instant('register.requiredError'),
    PASSWORD_PATTERN: this.translate.instant('register.passwordPatternError'),
    PASSWORD_PREDICTABLE: this.translate.instant(
      'register.passowordPredictableError'
    ),
    EMAIL: this.translate.instant('register.emailPatternError'),
    GENERIC: this.translate.instant('register.genericFormError'),
  };
  public PASSWORD_PATTERN = '(?=.*[a-z])(?=.*[A-Z]).{8,}';

  public registerForm = this.fb.group(
    {
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(this.PASSWORD_PATTERN),
        ]),
      ],
    },
    { validators: passwordPredictableValidatorFactory() }
  );

  public async onSubmit() {
    // Safe cast as validators past on this point
    this.formSubmit.emit(this.registerForm.value as unknown as FormSubmitValue);
  }

  public get firstnameErrors() {
    return this.getFieldErrors('firstname');
  }

  public get lastnameErrors() {
    return this.getFieldErrors('lastname');
  }

  public get emailErrors() {
    return this.getFieldErrors('email');
  }

  public get passwordErrors() {
    const arr = [
      this.registerForm.errors?.['passwordPredictable']
        ? 'passwordPredictable'
        : null,
      ...(this.getFieldErrors('password') ?? []),
    ]
      .filter(isNonNullish)
      .map((e) => {
        switch (e) {
          case 'pattern':
            return this.ERRORS.PASSWORD_PATTERN;
          case 'passwordPredictable':
            return this.ERRORS.PASSWORD_PREDICTABLE;
          default:
            return e;
        }
      });
    return arr.length ? arr : undefined;
  }

  public getInputErrorClass(predicate: boolean) {
    return { 'ring-red-400 hover:ring-red-400': predicate };
  }

  public triggerForm() {
    this.registerForm.markAllAsTouched();
  }

  private getFieldErrors(name: string) {
    const field = this.registerForm.get(name);
    if (!field || !field.touched || !field.errors) return undefined;

    const result = Object.keys(field.errors).map((k) => this.mapErrorTexts(k));
    return result?.length ? result : undefined;
  }

  private mapErrorTexts(key: string) {
    switch (key) {
      case 'required':
        return this.ERRORS.REQUIRED;
      case 'email':
        return this.ERRORS.EMAIL;
      case 'pattern':
        return key;
      default:
        return this.ERRORS.GENERIC;
    }
  }
}

/**
 * Checks if firstname or lastname has been used in password
 * Only executes the logic if either string is equal or longer than 3 characters
 */
function passwordPredictableValidatorFactory(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = (l: string) =>
      (control.get(l)?.value as string | undefined)?.trim()?.toLowerCase();
    const firstname = value('firstname');
    const lastname = value('lastname');
    const password = value('password');

    const canValidate = (firstname || lastname) && password;
    if (!canValidate) return null;

    const includes = (s: Nullable<string>) =>
      s && s.length >= 3 && password.indexOf(s) > -1;

    if (includes(firstname) || includes(lastname)) {
      return { passwordPredictable: true };
    }
    return null;
  };
}
