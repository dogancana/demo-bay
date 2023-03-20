import { RegistrationModule } from '../registration.module';
import { RegistrationFormComponent } from './registration-form.component';

describe('RegistrationFormComponent', () => {
  const module = {
    imports: [RegistrationModule],
  };

  it('mounts', () => {
    cy.mount(RegistrationFormComponent, module);
  });

  it('shows loading when necessary', () => {
    cy.mount(RegistrationFormComponent, {
      ...module,
      componentProperties: { loading: true },
    });
    cy.findByRole('button', { name: /register.registering/i }).should('exist');
  });

  it('shows required errors on field clicks', () => {
    cy.mount(RegistrationFormComponent, module);

    cy.findByPlaceholderText('register.firstnamePlaceholder').click();
    cy.findByPlaceholderText('register.lastnamePlaceholder').click();
    cy.findByPlaceholderText('register.emailPlaceholder').click();
    cy.findByPlaceholderText('register.passwordPlaceholder').click().blur();
    cy.findAllByText('register.requiredError').should('have.length', 4);
  });

  it('shows email error', () => {
    cy.mount(RegistrationFormComponent, module);

    cy.findByPlaceholderText('register.emailPlaceholder').type('asd').blur();
    cy.findByText('register.emailPatternError').should('exist');
  });

  it('shows password pattern error', () => {
    cy.mount(RegistrationFormComponent, module);

    cy.findByPlaceholderText('register.passwordPlaceholder').type('asd').blur();
    cy.findByText('register.passwordPatternError').should('exist');
  });

  it('shows password predictable error', () => {
    cy.mount(RegistrationFormComponent, module);

    cy.findByPlaceholderText('register.firstnamePlaceholder').type('Dogancan');
    cy.findByPlaceholderText('register.lastnamePlaceholder').type('Arabaci');
    cy.findByPlaceholderText('register.passwordPlaceholder')
      .type('Dogancan123')
      .blur();
    cy.findByText('register.passowordPredictableError').should('exist');
  });

  it('emits submit event when needed', () => {
    cy.mount(RegistrationFormComponent, module);

    cy.findByPlaceholderText('register.firstnamePlaceholder').type('Dogancan');
    cy.findByPlaceholderText('register.lastnamePlaceholder').type('Arabaci');
    cy.findByPlaceholderText('register.emailPlaceholder').type(
      'dogancan.arabaci@gmail.com'
    );
    cy.findByPlaceholderText('register.passwordPlaceholder').type('Password');
    cy.findByRole('button', { name: /register.formsubmit/i })
      .should('be.enabled')
      .click();
    cy.get('@formSubmitSpy').should('have.been.called');
  });
});
