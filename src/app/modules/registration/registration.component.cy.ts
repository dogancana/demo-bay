import { RegistrationComponent } from './registration.component';
import { RegistrationModule } from './registration.module';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { of } from 'rxjs';

describe('RegistrationComponent', () => {
  const module = { imports: [RegistrationModule] };

  it('mounts', () => {
    cy.mount(RegistrationComponent, module);
  });

  it('shows expected content', () => {
    cy.mount(RegistrationComponent, module);
    cy.findByText('register.header').should('exist');
    cy.findByPlaceholderText('register.firstnamePlaceholder').should('exist');
  });

  it('should show loading once form submitted', () => {
    cy.mount(RegistrationComponent, module);
    submit();
    cy.findByRole('button', { name: /register.registering/i }).should('exist');
  });

  it('should show registration successful once registered', () => {
    cy.mount(RegistrationComponent, module);
    submit();
    cy.findByText('register.success').should('exist');
  });

  it('should show an error if registration request failed', () => {
    cy.mount(RegistrationComponent, {
      ...module,
      providers: [
        {
          provide: AuthenticationService,
          useValue: {
            state$: of({ registrationError: 'Something happened' }),
            register: () => Promise.reject('Something happened'),
          },
        },
      ],
    });
    cy.findByText('Something happened').should('exist');
  });

  function submit() {
    cy.findByPlaceholderText('register.firstnamePlaceholder').type('Dogancan');
    cy.findByPlaceholderText('register.lastnamePlaceholder').type('Arabaci');
    cy.findByPlaceholderText('register.emailPlaceholder').type(
      'dogancan.arabaci@gmail.com'
    );
    cy.findByPlaceholderText('register.passwordPlaceholder').type('Password');
    cy.findByRole('button', { name: /register.formsubmit/i })
      .should('be.enabled')
      .click();
  }
});
