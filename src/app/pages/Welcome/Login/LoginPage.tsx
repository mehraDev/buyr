import LoginForm from 'app/components/Login/Login';
import React, { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

interface LoginPageProps {
  // Props for the WelcomePage component, if any
}

const LoginPage: React.FC<LoginPageProps> = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in, redirect to dashboard or any other page
        navigate('/dashboard');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <>
      <div>
        <h1>Digibhoomi</h1>
        <p>Empowering Local Businesses, Digitally!</p>
      </div>
      <div>
        <LoginForm  onAccountCreation={() => console.log('s')}/>
      </div>
    </>
  );
};

export default LoginPage;
