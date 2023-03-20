import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';

const publicComponents = [ButtonComponent];

@NgModule({
  declarations: [...publicComponents],
  imports: [CommonModule],
  exports: publicComponents,
})
export class ButtonModule {}
