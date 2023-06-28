import Login from 'app/components/Login/Login';
import React, { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { BrandWrapper, LoginWrapper, TitleWrapper, WelcomePageWrapper } from './styles';


interface WelcomePageProps {
  // Props for the WelcomePage component, if any
}

const WelcomePage: React.FC<WelcomePageProps> = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/dashboard');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <WelcomePageWrapper>
      <BrandWrapper>
        <TitleWrapper>
        
        <h1>Digibhoomi</h1>
        </TitleWrapper>
        
        <h2>Digibhoomi Connects Local Sellers and Buyers</h2>
      </BrandWrapper>
      <LoginWrapper>
      <Login onAccountCreation={() => console.log('los')}/>
      </LoginWrapper>
        
    </WelcomePageWrapper>
  );
};

export default WelcomePage;
