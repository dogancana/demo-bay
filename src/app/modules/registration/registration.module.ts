import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from '../ui/button/button.module';
import { FormsModule } from '../ui/forms/forms.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationFieldErrorComponent } from './registration-field-error/registration-field-error.component';
import { SpinnerComponent } from '../ui/spinner/spinner.component';

@NgModule({
  declarations: [
    RegistrationComponent,
    RegistrationFormComponent,
    RegistrationFieldErrorComponent,
  ],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    ButtonModule,
    SpinnerComponent,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
  ],
})
export class RegistrationModule {}
