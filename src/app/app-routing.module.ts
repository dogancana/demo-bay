import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'registration', loadChildren: () => import('./modules/registration/registration.module').then(m => m.RegistrationModule) }, { path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
