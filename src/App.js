import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import SignUp from './components/SignUp';
import MFAVerification from './components/MFAVerification';
import Dashboard from './components/Dashboard';
import './App.css';

// Main App Wrapper
function AppContent() {
  const { isAuthenticated, login } = useAuth();
  const [currentScreen, setCurrentScreen] = useState('login');
  const [tempCredentials, setTempCredentials] = useState(null);

  // Reset to login when user logs out
  useEffect(() => {
    if (!isAuthenticated) {
      setCurrentScreen('login');
      setTempCredentials(null);
    }
  }, [isAuthenticated]);

  const handleLoginSuccess = (email, userData) => {
    // Store credentials temporarily and move to MFA
    setTempCredentials({ email, userData });
    setCurrentScreen('mfa');
  };

  const handleMFASuccess = (email, userData) => {
    // MFA verified - now actually log the user in
    login(email, userData);
    setCurrentScreen('dashboard');
  };

  const handleSignUpSuccess = () => {
    setCurrentScreen('login');
  };

  // If authenticated, show dashboard
  if (isAuthenticated) {
    return <Dashboard />;
  }

  // Otherwise show login flow
  return (
    <div className="App">
      {currentScreen === 'login' && (
        <Login
          onSuccess={handleLoginSuccess}
          onSignUpClick={() => setCurrentScreen('signup')}
        />
      )}
      
      {currentScreen === 'signup' && (
        <SignUp
          onBack={() => setCurrentScreen('login')}
          onSuccess={handleSignUpSuccess}
        />
      )}

      {currentScreen === 'mfa' && tempCredentials && (
        <MFAVerification
          email={tempCredentials.email}
          userData={tempCredentials.userData}
          onSuccess={handleMFASuccess}
          onBack={() => setCurrentScreen('login')}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;