describe('template spec', () => {
  it('shows home page with no registration message', () => {
    cy.visit('');
    cy.findByText('Log in').should('exist');
    cy.findByRole('button', { name: /register/i }).should('exist');
  });

  it('takes me to register form as expected', () => {
    cy.visit('');
    cy.findByRole('button', { name: /register/i }).click();
    cy.url().should('contain', 'registration');
    cy.findByText('Register to get latest updates').should('exist');
  });

  it('shows all expected errors', () => {
    cy.visit('registration');
    cy.findByPlaceholderText('First name').click();
    cy.findByPlaceholderText('Last name').click();
    cy.findByPlaceholderText('Email').click();
    cy.findByPlaceholderText('Password').click().blur();

    cy.findAllByText('This field is required').should('have.length', 4);

    cy.findByPlaceholderText('Email').type('asd');
    cy.findByText('Please provide a valid email address').should('exist');

    cy.findByPlaceholderText('Password').type('asd');
    cy.findByText(
      'Password must contain at least one uppercase and lowercase letter and at least 8 or more characters'
    ).should('exist');

    cy.findByPlaceholderText('First name').type('Dogancan');
    cy.findByPlaceholderText('Password').type('Dogancan123');
    const passwordPredictableText =
      'Password must not contain first name or last name';
    cy.findByText(passwordPredictableText).should('exist');
    cy.findByPlaceholderText('Password').clear().type('Arabaci123');

    cy.findByPlaceholderText('Email')
      .clear()
      .type('dogancan.arabaci@gmail.com');
    cy.findByPlaceholderText('Last name').type('A');
    cy.findByRole('button', { name: /register/i }).should('be.enabled');

    cy.findByPlaceholderText('Last name').clear().type('Arabaci');
    cy.findByText(passwordPredictableText).should('exist');
    cy.findByPlaceholderText('Password').clear().type('Password');
  });

  it('completes registration flow', () => {
    cy.visit('registration');
    cy.findByPlaceholderText('First name').type('Dogancan');
    cy.findByPlaceholderText('Last name').type('Arabaci');
    cy.findByPlaceholderText('Email').type('dogancan.arabaci@gmail.com');
    cy.findByPlaceholderText('Password').type('Password');
    cy.findByRole('button', { name: /register/i }).click();

    cy.findByText('Welcome Dogancan', { timeout: 5000 }).should('exist');
    cy.url({ timeout: 10000 }).should('not.contain', 'registration');
  });
});
