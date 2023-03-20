import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputDirective } from './input/input.directive';

const publicComponents = [InputDirective];

@NgModule({
  declarations: [...publicComponents],
  imports: [CommonModule],
  exports: publicComponents,
})
export class FormsModule {}
