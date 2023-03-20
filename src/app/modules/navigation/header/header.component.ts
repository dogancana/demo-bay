import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ROUTES } from 'src/app/constants/routes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  constructor(private auth: AuthenticationService) {}

  public username$ = this.auth.state$.pipe(map((s) => s?.firstName));
  public ROUTES = ROUTES;
}
