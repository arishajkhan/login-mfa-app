# Login + MFA Authentication System

A React-based authentication system featuring multi-factor authentication (MFA), role-based access control, and comprehensive end-to-end testing.

## Features

- Login System with email and password validation
- Multi-Factor Authentication (MFA) using 6-digit OTP verification
- Sign-Up Flow with form validation and password confirmation
- Role-Based Access Control with three user roles:
  - Admin (full read/write access)
  - Regular User (read/write access)
  - Read-Only User (view-only access)
- Protected Dashboard with role-specific UI elements
- Comprehensive Test Coverage with 10 Cypress E2E tests

## Tech Stack

- Frontend: React 19.2.0
- Styling: Tailwind CSS (inline utility classes)
- Icons: Lucide React
- Testing: Cypress 15.4.0
- State Management: React Context API

## Project Structure

```
login-mfa-app/
├── src/
│   ├── components/
│   │   ├── Login.js              # Login page component
│   │   ├── SignUp.js             # Registration page
│   │   ├── MFAVerification.js    # OTP verification screen
│   │   └── Dashboard.js          # Protected dashboard
│   ├── context/
│   │   └── AuthContext.js        # Authentication state management
│   ├── App.js                    # Main application component
│   └── index.js                  # Application entry point
├── cypress/
│   └── e2e/
│       └── auth-flow.cy.js       # E2E test suite
├── cypress.config.js             # Cypress configuration
├── package.json
└── README.md
```

## Installation

### Prerequisites

- Node.js (v18 or higher)
- npm (comes with Node.js)

### Setup

1. Clone the repository (or extract the project folder)

2. Navigate to the project directory:
   ```bash
   cd login-mfa-app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Development Mode

Start the development server:

```bash
npm start
```

The application will open automatically in your browser at http://localhost:3000

### Demo Credentials

Use these credentials to test different user roles:

Admin User (Full Access):
- Email: admin@alkira.com
- Password: Admin123!
- MFA Code: 123456

Read-Only User:
- Email: readonly@alkira.com
- Password: Read123!
- MFA Code: 123456

Regular User:
- Email: user@alkira.com
- Password: User123!
- MFA Code: 123456

## Running Tests

### Cypress E2E Tests

The project includes 10 comprehensive end-to-end tests covering:
- Login flow with MFA
- Form validations
- Access control restrictions
- Sign-up process
- Error handling

### Run Tests Interactively

1. Start the development server (in one terminal):
   ```bash
   npm start
   ```

2. Open Cypress Test Runner (in a second terminal):
   ```bash
   npx cypress open
   ```

3. In the Cypress window:
   - Click "E2E Testing"
   - Select your preferred browser (Chrome recommended)
   - Click "Start E2E Testing"
   - Click on auth-flow.cy.js to run the tests

### Run Tests in Headless Mode

For CI/CD or automated testing:

```bash
# Make sure the app is running first (npm start)
npx cypress run
```

## Test Coverage

All 10 tests validate critical functionality:

1. Complete login flow with MFA for admin user
2. Invalid credentials error handling
3. Email format validation
4. Password length validation
5. Invalid MFA code error handling
6. Read-only user access restrictions
7. Navigation to sign-up page
8. Sign-up form validation
9. Password confirmation matching
10. Logout functionality

## Application Flow

### 1. Login
- User enters email and password
- Form validates input before submission
- On success, redirects to MFA verification

### 2. MFA Verification
- User enters 6-digit OTP code
- Supports manual entry or paste
- Auto-focus between input fields
- Validates code before granting access

### 3. Dashboard
- Displays user information and access level
- Shows network configurations
- Role-based UI:
  - Admin/User: Can edit and delete items
  - Read-Only: View-only access, no action buttons

### 4. Sign-Up
- Collects user information
- Validates password strength
- Confirms password match
- Returns to login on success

## Design Decisions

### Authentication Architecture
- Mock Authentication: Uses in-memory user store for demonstration
- Context API: Manages global authentication state
- Protected Routes: Dashboard only accessible after login + MFA

### Security Features
- Email format validation
- Password strength requirements (min 8 characters, uppercase, lowercase, numbers)
- Two-factor authentication (MFA)
- Session management via React Context

### UX Enhancements
- Auto-focus between OTP input fields
- Paste support for OTP codes
- Loading states during authentication
- Clear error messages
- Responsive design with Tailwind CSS

### Testing Strategy
- End-to-end tests cover complete user journeys
- Tests validate both happy paths and error scenarios
- Role-based access control is thoroughly tested
- All form validations have test coverage

## Production Considerations

For production deployment, consider implementing:

- Backend API: Replace mock authentication with real API calls
- Secure Storage: Use HTTP-only cookies or secure token storage
- Real MFA: Integrate with services like Twilio, Auth0, or AWS Cognito
- Database: Store user credentials securely with proper hashing
- HTTPS: Ensure all traffic is encrypted
- Rate Limiting: Prevent brute force attacks
- Session Management: Implement token refresh and expiration
- Audit Logging: Track authentication events

## Browser Support

- Chrome (latest)
- Edge (latest)
- Firefox (latest)
- Safari (latest)

## Known Limitations

- Mock Data: Authentication uses hardcoded credentials (for demo only)
- MFA Code: Static code 123456 (would be dynamic in production)
- No Persistence: State resets on page refresh
- Client-Side Only: No backend API integration

## Troubleshooting

### Tests Failing

Issue: Cypress tests fail with "cy.visit() failed"  
Solution: Ensure npm start is running before executing tests

Issue: Tests timeout  
Solution: Check that the app is accessible at http://localhost:3000

### Port Already in Use

Issue: Error starting app - port 3000 in use  
Solution: Kill the process using port 3000 or change the port in package.json

## License

This project is created as a take-home exercise for Alkira.

## Author

Created for Alkira Frontend Engineering Position

---

Note: This is a demonstration project. 