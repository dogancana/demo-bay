import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationFormComponent {
  public PLACEHOLDER = {
    FIRSTNAME: this.translate.instant('register.firstnamePlaceholder'),
    LASTNAME: this.translate.instant('register.lastnamePlaceholder'),
    EMAIL: this.translate.instant('register.emailPlaceholder'),
    PASSWORD: this.translate.instant('register.passwordPlaceholder'),
  };
  constructor(private translate: TranslateService) {}
}
