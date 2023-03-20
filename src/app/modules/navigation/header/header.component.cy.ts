import { HeaderComponent } from './header.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { of } from 'rxjs';

describe('HeaderComponent', () => {
  it('mounts', () => {
    cy.mount(HeaderComponent);
  });

  it('shows login link initially', () => {
    cy.mount(HeaderComponent);
    cy.findByText('header.loginLink').should('exist');
  });

  it('shows welcome message if registered', () => {
    cy.mount(HeaderComponent, {
      providers: [
        {
          provide: AuthenticationService,
          useValue: { state$: of({ firstName: 'Test' }) },
        },
      ],
    });
    cy.findByText('Welcome Test').should('exist');
  });
});
