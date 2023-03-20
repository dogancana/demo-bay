import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonDirective } from './button.directive';

const publicComponents = [ButtonDirective];

@NgModule({
  declarations: [...publicComponents],
  imports: [CommonModule],
  exports: publicComponents,
})
export class ButtonModule {}
