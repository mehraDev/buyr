import React, { useState } from 'react';
import { loginUser } from 'app/services/Login/loginSignup';
import {
  BrandWrapper,
  CreateAccount,
  ForgotPassword,
  Input,
  LoginWrapper,
  ErrorWrapper
} from './styles';
import Button from 'ui/Button';
import Brand from 'app/components/Brand';
import Error from 'ui/Error';
interface LoginProps {
  onAccountCreation: () => void;
}

const Login: React.FC<LoginProps> = ({ onAccountCreation }) => {
  const [emailOrId, setEmailOrId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleLogin = async () => {
    setEmailError('');
    setPasswordError('');
    setErrorMessage('');
    setShowPassword(false)
    // validation 
    if (!emailOrId) {
      setEmailError('Email is required');
      return;
    }
    if (!emailRegex.test(emailOrId)) {
      setEmailError('Invalid email address');
      return;
    }
    // Validate password
    if (!password) {
      setPasswordError('Password is required');
      return;
    }

    try {
      await loginUser(emailOrId, password);
    } catch (error: any) {
      setErrorMessage('Incorrect email or password.');
    }
  };

  const handleForgotPassword = () => {
    // Implement the logic to handle forgot password functionality (e.g., send reset password email)
  };

  return (
    <LoginWrapper>
      <BrandWrapper>
      <Brand/>
      </BrandWrapper>
      <Input
        type="text"
        placeholder="Email or ID"
        value={emailOrId}
        onChange={(e) => setEmailOrId(e.target.value)}
      />
      {emailError && 
        <ErrorWrapper>
          <Error children={emailError} />
          </ErrorWrapper>
      }
      <Input
        type={showPassword ? 'text' : 'password'}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {passwordError && 
      <ErrorWrapper>
      <Error children={passwordError} />
      </ErrorWrapper>
      }
      {errorMessage && 
        <ErrorWrapper>
        <Error children={errorMessage} />
        </ErrorWrapper>
      }
      <Button
        fullWidth={true}
        onClick={handleLogin}
        padding="0.5rem 1rem"
        margin="1rem 0.5rem 0.5rem"
        variant='primary'
      >
        Log in
      </Button>
      
      <ForgotPassword>
        <a href="/" onClick={handleForgotPassword}>
          Forgot password?
        </a>
      </ForgotPassword>
      <CreateAccount onClick={onAccountCreation}>
        Create new account
      </CreateAccount>
    </LoginWrapper>
  );
};

export default Login;
