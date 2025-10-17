describe('Authentication Flow with MFA', () => {
  beforeEach(() => {
    // Visit the app before each test
    cy.visit('/');
  });

  // Test 1: Successful Login with MFA (Admin User)
  it('should complete full login flow with MFA for admin user', () => {
    // Check login page is visible
    cy.contains('Welcome Back').should('be.visible');
    cy.contains('Sign in to your account').should('be.visible');

    // Enter credentials
    cy.get('[data-cy="email-input"]').type('admin@alkira.com');
    cy.get('[data-cy="password-input"]').type('Admin123!');
    
    // Submit login
    cy.get('[data-cy="login-button"]').click();

    // Should redirect to MFA page
    cy.contains('Verify Your Identity').should('be.visible');
    cy.contains('admin@alkira.com').should('be.visible');

    // Enter MFA code
    cy.get('[data-cy="otp-input-0"]').type('1');
    cy.get('[data-cy="otp-input-1"]').type('2');
    cy.get('[data-cy="otp-input-2"]').type('3');
    cy.get('[data-cy="otp-input-3"]').type('4');
    cy.get('[data-cy="otp-input-4"]').type('5');
    cy.get('[data-cy="otp-input-5"]').type('6');

    // Submit MFA
    cy.get('[data-cy="verify-button"]').click();

    // Should be redirected to dashboard
    cy.contains('Dashboard').should('be.visible');
    cy.contains('Welcome back, Admin User').should('be.visible');
    cy.contains('Admin - Full Access').should('be.visible');

    // Admin should see edit buttons
    cy.get('[data-cy="edit-button-1"]').should('be.visible');
    cy.get('[data-cy="delete-button-1"]').should('be.visible');
  });

  // Test 2: Invalid Login Credentials
  it('should show error for invalid credentials', () => {
    // Enter invalid credentials
    cy.get('[data-cy="email-input"]').type('wrong@email.com');
    cy.get('[data-cy="password-input"]').type('wrongpassword');
    
    // Submit login
    cy.get('[data-cy="login-button"]').click();

    // Should show error message
    cy.contains('Invalid email or password').should('be.visible');

    // Should still be on login page
    cy.contains('Welcome Back').should('be.visible');
  });

  // Test 3: Email Validation
  it('should validate email format', () => {
    // Enter invalid email format
    cy.get('[data-cy="email-input"]').type('notanemail');
    cy.get('[data-cy="password-input"]').type('Password123!');
    
    // Submit login
    cy.get('[data-cy="login-button"]').click();

    // Should show validation error
    cy.contains('Please enter a valid email address').should('be.visible');
  });

  // Test 4: Password Validation
  it('should validate password length', () => {
    // Enter short password
    cy.get('[data-cy="email-input"]').type('test@email.com');
    cy.get('[data-cy="password-input"]').type('short');
    
    // Submit login
    cy.get('[data-cy="login-button"]').click();

    // Should show validation error
    cy.contains('Password must be at least 8 characters').should('be.visible');
  });

  // Test 5: Invalid MFA Code
  it('should show error for invalid MFA code', () => {
    // Login with valid credentials
    cy.get('[data-cy="email-input"]').type('admin@alkira.com');
    cy.get('[data-cy="password-input"]').type('Admin123!');
    cy.get('[data-cy="login-button"]').click();

    // Wait for MFA page
    cy.contains('Verify Your Identity').should('be.visible');

    // Enter wrong MFA code
    cy.get('[data-cy="otp-input-0"]').type('9');
    cy.get('[data-cy="otp-input-1"]').type('9');
    cy.get('[data-cy="otp-input-2"]').type('9');
    cy.get('[data-cy="otp-input-3"]').type('9');
    cy.get('[data-cy="otp-input-4"]').type('9');
    cy.get('[data-cy="otp-input-5"]').type('9');

    // Submit MFA
    cy.get('[data-cy="verify-button"]').click();

    // Should show error
    cy.contains('Invalid verification code').should('be.visible');

    // Should still be on MFA page
    cy.contains('Verify Your Identity').should('be.visible');
  });

  // Test 6: Read-Only User Access Control
  it('should restrict edit actions for read-only user', () => {
    // Login with read-only user
    cy.get('[data-cy="email-input"]').type('readonly@alkira.com');
    cy.get('[data-cy="password-input"]').type('Read123!');
    cy.get('[data-cy="login-button"]').click();

    // Complete MFA
    cy.contains('Verify Your Identity').should('be.visible');
    cy.get('[data-cy="otp-input-0"]').type('1');
    cy.get('[data-cy="otp-input-1"]').type('2');
    cy.get('[data-cy="otp-input-2"]').type('3');
    cy.get('[data-cy="otp-input-3"]').type('4');
    cy.get('[data-cy="otp-input-4"]').type('5');
    cy.get('[data-cy="otp-input-5"]').type('6');
    cy.get('[data-cy="verify-button"]').click();

    // Should be on dashboard
    cy.contains('Dashboard').should('be.visible');
    cy.contains('Read Only User').should('be.visible');
    cy.contains('Read Only').should('be.visible');

    // Should show read-only warning
    cy.contains('You have read-only access').should('be.visible');

    // Should NOT see edit/delete buttons
    cy.get('[data-cy="edit-button-1"]').should('not.exist');
    cy.get('[data-cy="delete-button-1"]').should('not.exist');
  });

  // Test 7: Sign Up Navigation
  it('should navigate to sign up page', () => {
    // Click sign up link
    cy.get('[data-cy="signup-link"]').click();

    // Should be on sign up page
    cy.contains('Create Account').should('be.visible');
    cy.contains('Join us today').should('be.visible');

    // Should have all form fields
    cy.get('[data-cy="signup-name"]').should('be.visible');
    cy.get('[data-cy="signup-email"]').should('be.visible');
    cy.get('[data-cy="signup-password"]').should('be.visible');
    cy.get('[data-cy="signup-confirm-password"]').should('be.visible');
  });

  // Test 8: Sign Up Form Validation
  it('should validate sign up form', () => {
    // Go to sign up
    cy.get('[data-cy="signup-link"]').click();

    // Try to submit empty form
    cy.get('[data-cy="signup-submit"]').click();

    // Should show validation errors
    cy.contains('Name is required').should('be.visible');
    cy.contains('Email is required').should('be.visible');
    cy.contains('Password is required').should('be.visible');
  });

  // Test 9: Sign Up Password Mismatch
  it('should validate password confirmation', () => {
    // Go to sign up
    cy.get('[data-cy="signup-link"]').click();

    // Fill form with mismatched passwords
    cy.get('[data-cy="signup-name"]').type('Test User');
    cy.get('[data-cy="signup-email"]').type('test@test.com');
    cy.get('[data-cy="signup-password"]').type('Password123!');
    cy.get('[data-cy="signup-confirm-password"]').type('DifferentPass123!');

    // Submit
    cy.get('[data-cy="signup-submit"]').click();

    // Should show error
    cy.contains('Passwords do not match').should('be.visible');
  });

  // Test 10: Logout Functionality
  it('should logout and return to login page', () => {
    // Login flow
    cy.get('[data-cy="email-input"]').type('admin@alkira.com');
    cy.get('[data-cy="password-input"]').type('Admin123!');
    cy.get('[data-cy="login-button"]').click();

    // Complete MFA
    cy.get('[data-cy="otp-input-0"]').type('1');
    cy.get('[data-cy="otp-input-1"]').type('2');
    cy.get('[data-cy="otp-input-2"]').type('3');
    cy.get('[data-cy="otp-input-3"]').type('4');
    cy.get('[data-cy="otp-input-4"]').type('5');
    cy.get('[data-cy="otp-input-5"]').type('6');
    cy.get('[data-cy="verify-button"]').click();

    // Should be on dashboard
    cy.contains('Dashboard').should('be.visible');

    // Click logout
    cy.get('[data-cy="logout-button"]').click();

    // Should be back on login page
    cy.contains('Welcome Back').should('be.visible');
    cy.contains('Sign in to your account').should('be.visible');
  });
});