import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { TranslateModule } from '@ngx-translate/core';

const publicComponents = [HeaderComponent];

@NgModule({
  declarations: [...publicComponents],
  imports: [CommonModule, TranslateModule.forChild()],
  exports: publicComponents,
})
export class NavigationModule {}
