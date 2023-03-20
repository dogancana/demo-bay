import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-registration-field-error',
  template: `
    <div *ngFor="let error of errors || []" class="text-red-400 text-xs">
      {{ error }}
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationFieldErrorComponent {
  @Input()
  public errors: Nullable<string[]>;
}
