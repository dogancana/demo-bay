import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from '../ui/button/button.module';
import { FormsModule } from '../ui/forms/forms.module';

@NgModule({
  declarations: [RegistrationComponent, RegistrationFormComponent],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    ButtonModule,
    FormsModule,
    TranslateModule.forChild(),
  ],
})
export class RegistrationModule {}
