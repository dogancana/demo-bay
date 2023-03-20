import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { map } from 'rxjs/operators';
import { ROUTES } from 'src/app/constants/routes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  constructor(private auth: AuthenticationService) {}

  public username$ = this.auth.state$.pipe(map((s) => s?.firstName));
  public ROUTES = ROUTES;
}
