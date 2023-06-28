import { loginUser } from 'app/services/Login/loginSignup';
import React, { useState } from 'react';
import {  CreateAccount, ForgotPassword, Input, LoginWrapper } from './styles';
import Button from 'ui/Button';


interface LoginProps {
  onAccountCreation: () => void;
}

const Login: React.FC<LoginProps> = ({ onAccountCreation }) => {
  const [emailOrId, setEmailOrId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
   loginUser(emailOrId,password);
  };

  return (
    <LoginWrapper>
      <Input
        type="text"
        placeholder="Email or ID"
        value={emailOrId}
        onChange={(e) => setEmailOrId(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button fullWidth={true} onClick={handleLogin} padding='0.5rem 1rem' margin='0.5rem' >Log in</Button>
      <ForgotPassword>
        <a href="/">Forgot password?</a>
      </ForgotPassword>
      <CreateAccount onClick={onAccountCreation}>
        Create new account
      </CreateAccount>
    </LoginWrapper>
  );
};

export default Login;
