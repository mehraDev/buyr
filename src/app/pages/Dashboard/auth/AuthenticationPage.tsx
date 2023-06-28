import React, { useState } from 'react';

import Signup from 'app/components/Signup';
import Login from 'app/pages/Login';
import { AuthWrapper } from './styles';

interface IAuthenticationPage {
  onSignUp: (flag:boolean) => void
}

const AuthenticationPage: React.FC<IAuthenticationPage> = ({onSignUp}) => {
  const [showLogin, setShowLogin] = useState<boolean>(true);
  
  const handleShowSignup = () => {
    setShowLogin(false);
  };

  const handleShowLogin = () => {
    setShowLogin(true);
  };

  return (
    <AuthWrapper className='auth'>
        {showLogin ? (
        <Login onAccountCreation={handleShowSignup} />
      ) : (
        <Signup onExistingUserClick={handleShowLogin} onSignUp={onSignUp}/>
      )}
    </AuthWrapper>
  );
};

export default AuthenticationPage;
