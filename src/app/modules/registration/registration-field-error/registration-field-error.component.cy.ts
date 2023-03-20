import { RegistrationFieldErrorComponent } from './registration-field-error.component';

describe('RegistrationFieldErrorComponent', () => {
  it('mounts', () => {
    cy.mount(RegistrationFieldErrorComponent);
  });

  it('shows errors', () => {
    cy.mount(RegistrationFieldErrorComponent, {
      componentProperties: {
        errors: ['Error1'],
      },
    });
    cy.findByText('Error1').should('exist');
  });
});
