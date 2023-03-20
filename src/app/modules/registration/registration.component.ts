import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay, Subject } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ROUTES } from '../../constants/routes';
import { FormSubmitValue } from './models';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  public loading$ = this.auth.state$.pipe(map((s) => s.registrationInProgress));
  public error$ = this.auth.state$.pipe(map((s) => s.registrationError));
  public willRedirect$$ = new Subject<boolean>();

  constructor(private auth: AuthenticationService, private router: Router) {}

  public ngOnInit(): void {
    this.subscribeToData();
  }

  public async register(values: FormSubmitValue) {
    const { firstname, lastname, email } = values;
    try {
      await this.auth.register({
        firstName: firstname,
        lastName: lastname,
        email,
      });
      this.willRedirect$$.next(true);
    } catch (e) {
      console.error(e);
    }
  }

  private subscribeToData() {
    this.willRedirect$$
      .pipe(
        filter((v) => v),
        take(1),
        delay(3000)
      )
      .subscribe(() => this.router.navigate([ROUTES.HOME]));
  }
}
