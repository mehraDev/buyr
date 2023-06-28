import React, { useState } from 'react';
import { Button, ButtonWrapper, Form, FormTitle, Input, InputWrapper, LoginLink, LoginLinkWrapper, Select, SignupFormWrapper } from './styles';
import signupAndCreateUserProfile from './services';

interface Props {
  onExistingUserClick: () => void;
  onSignUp: (flag:boolean) => void;
}

const SignupForm: React.FC<Props> = ({ onExistingUserClick,onSignUp }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [shopName, setShopName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [shopType, setShopType] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (
      !firstName ||
      !lastName ||
      !shopName ||
      !phone ||
      !email ||
      !password ||
      !shopType
    ) {
      setFormError('Please fill in all fields.');
      return;
    }

    const formData = {
      firstName,
      lastName,
      shopName,
      phone,
      email,
      password,
      shopType,
    };

    try {
      await signupAndCreateUserProfile(formData);
      onSignUp(false);
    } catch (error: any) {
      console.error('Error signing up:', error.code, error.message);
    }
  };

  return (
    <SignupFormWrapper>
      <FormTitle>Create your account</FormTitle>
      <Form onSubmit={handleSubmit}>
        <InputWrapper>
          <Input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            type="text"
            placeholder="Shop Name"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <Select value={shopType} onChange={(e) => setShopType(e.target.value)}>
            <option value="">Shop Type</option>
            <option value="grocery">Grocery</option>
            <option value="food">Food</option>
            <option value="Fashion">Fashion</option>
            <option value="Electronics">Electronics</option>
          </Select>
        </InputWrapper>
        {formError && <div>{formError}</div>}
        <ButtonWrapper>
          <Button type="submit">Sign up</Button>
        </ButtonWrapper>
      </Form>
      <LoginLinkWrapper>
        Already have an account?{' '}
        <LoginLink href="#" onClick={onExistingUserClick}>
          Log in
        </LoginLink>
      </LoginLinkWrapper>
    </SignupFormWrapper>
  );
};

export default SignupForm;
