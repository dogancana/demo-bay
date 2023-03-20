import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';

const publicComponents = [InputComponent];

@NgModule({
  declarations: [...publicComponents],
  imports: [CommonModule],
  exports: publicComponents,
})
export class FormsModule {}
