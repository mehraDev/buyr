import styled from 'styled-components';

const SignupFormWrapper = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #eaeaea;
`;

const FormTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const InputWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  padding: 10px;
  border: none;
  border-bottom: 2px solid #eaeaea;
  font-size: 16px;
  font-weight: 400;
  transition: border-bottom-color 0.2s ease;

  &:focus {
    border-bottom-color: #0077ff;
    outline: none;
  }

  &::placeholder {
    color: #9b9b9b;
  }
`;

const Select = styled.select`
  width: 100%;
  height: 50px;
  padding: 10px;
  border: none;
  border-bottom: 2px solid #eaeaea;
  font-size: 16px;
  font-weight: 400;
  transition: border-bottom-color 0.2s ease;

  &:focus {
    border-bottom-color: #0077ff;
    outline: none;
  }

  &::placeholder {
    color: #9b9b9b;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  margin-top: 30px;
`;

const Button = styled.button`
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 5px;
  background-color: #0077ff;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0062cc;
  }

  &:active {
    background-color: #0057b8;
  }
`;

const LoginLinkWrapper = styled.p`
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
`;

const LoginLink = styled.a`
  color: #0077ff;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #0062cc;
  }

  &:active {
    color: #0057b8;
  }
`;

export {
  SignupFormWrapper,
  FormTitle,
  Form,
  InputWrapper,
  Input,
  Select,
  ButtonWrapper,
  Button,
  LoginLinkWrapper,
  LoginLink,
};
