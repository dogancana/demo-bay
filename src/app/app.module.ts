import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationModule } from './modules/navigation/navigation.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { catchError, from, of } from 'rxjs';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    NavigationModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpTranslateLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializeFactory,
      deps: [TranslateService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function HttpTranslateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/locale/messages.', '.json');
}

export function appInitializeFactory(translateService: TranslateService) {
  return () => {
    const defaultLang = 'en';
    translateService.setDefaultLang(defaultLang);
    return from(translateService.use(defaultLang)).pipe(
      catchError((e: unknown) => {
        console.error(e);
        return of(undefined);
      })
    );
  };
}
