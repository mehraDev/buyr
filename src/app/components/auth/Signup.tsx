import React, { useState } from "react";
import { Row, Text } from "ui/basic";
import Form, { InputText } from "ui/Form";
import Button from "ui/Button";
import Icon, { IconName } from "ui/Icon";
import { useTheme } from "styled-components";
import InputPassword from "ui/Form/Inputs/InputPassword";
import { IFormSignUp } from "firebaseServices/auth/authService";

interface Props {
  onSignUp: (data: IFormSignUp) => Promise<boolean>;
  onNavigateLogin: () => void;
}

const SignupForm: React.FC<Props> = ({ onSignUp, onNavigateLogin }) => {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [signupError, setSignupError] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData: IFormSignUp = {
      email,
      password,
    };
    try {
      setIsSigningUp(true);
      await onSignUp(formData);
    } catch (error) {
      setSignupError("Oops! Something went wrong. ");
      throw error;
    } finally {
      setIsSigningUp(false);
    }
  };

  const isEmailValid = (email: string) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };
  const handleBlurEmail = () => {
    const sanitizedEmail = email.replace(/[^a-zA-Z0-9@._-]/g, "");
    if (
      email !== sanitizedEmail ||
      (email.length > 0 && !isEmailValid(email))
    ) {
      setEmail(sanitizedEmail);
      setEmailErrorMessage("Please enter a valid email address.");
    }
  };
  const handleChangeEmail = (v: string) => {
    setEmail(v);
    setEmailErrorMessage("");
  };

  const handleBlurPassword = () => {
    if (password && password.length < 8) {
      setPasswordErrorMessage("Password must be at least 8 characters long.");
    }
  };
  const handleChangePassword = (v: string) => {
    setPassword(v);
    setPasswordErrorMessage("");
    setConfirmPassword("");
    setConfirmPasswordErrorMessage("");
  };
  const handleClickPassword = () => {
    setPasswordErrorMessage("");
  };
  const handleBlurConfirmPassword = () => {
    if (confirmPassword && confirmPassword !== password) {
      setConfirmPasswordErrorMessage("Passwords do not match.");
    }
  };
  const handleChangeConfirmPassword = (v: string) => {
    setConfirmPassword(v);
    setConfirmPasswordErrorMessage("");
  };

  const isValidForm =
    email.trim() !== "" &&
    password.trim() !== "" &&
    confirmPassword.trim() !== "" &&
    !emailErrorMessage &&
    !passwordErrorMessage &&
    !confirmPasswordErrorMessage;
  return (
    <Form onSubmit={handleSignUp} style={{ gap: "1.5rem", width: "100%" }}>
      <InputText
        placeholder="Email"
        value={email}
        required={true}
        error={emailErrorMessage}
        onBlur={handleBlurEmail}
        onChange={handleChangeEmail}
      />
      <InputPassword
        value={password}
        onChange={handleChangePassword}
        onBlur={handleBlurPassword}
        error={passwordErrorMessage}
        placeholder="Password"
        type="new"
        onClick={handleClickPassword}
      />
      <InputPassword
        value={confirmPassword}
        onChange={handleChangeConfirmPassword}
        onBlur={handleBlurConfirmPassword}
        error={confirmPasswordErrorMessage}
        type="new"
        placeholder="Confirm Password"
        onClick={() => setConfirmPasswordErrorMessage("")}
      />
      <Row style={{ position: "relative" }}>
        {signupError && (
          <Row a="center" style={{ position: "absolute" }}>
            <Icon
              name={IconName.Alert}
              color={theme.errorColor.errorText}
              height={0.8}
              width={0.8}
              isHoverable={false}
            />
            <Text s="12" w={5} c={theme.errorColor.errorText}>
              {signupError}
            </Text>
          </Row>
        )}
      </Row>
      <Row>
        <Button variant="secondary" padding="0.5" onClick={onNavigateLogin}>
          <Text s="12" style={{ textDecoration: "underline" }}>
            Already have an account ?
          </Text>
        </Button>
      </Row>
      <Button
        loading={isSigningUp}
        width="100%"
        padding="1rem"
        type="submit"
        disabled={!isValidForm || isSigningUp}
      >
        <Text s="18" c="white" w={5} mb="2px" mt="2px">
          {isSigningUp ? `Signing up...` : `Continue`}
        </Text>
      </Button>
    </Form>
  );
};

export default SignupForm;
