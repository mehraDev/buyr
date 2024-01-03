import React, { useState } from "react";
// import Login from "./login";
// import Signup from "./signup";
import ForgotPassword from "./ResetPasswords";
import { Drawer } from "ui/Drawer";
import { Col, Row, Text } from "ui/basic";
import Login from "./Login";
import Signup from "./Signup";
import { useTheme } from "styled-components";
import Button from "ui/Button";
import Icon, { IconName } from "ui/Icon";
import { loginUser } from "firebaseServices/auth";
import { useAuth } from "app/contexts/auth/useAuth";
import { IFormSignUp, signupUser } from "firebaseServices/auth/authService";

interface AuthModalProps {
  isVisible: boolean;
}

const AuthModal: React.FC<AuthModalProps> = ({ isVisible }) => {
  const { closeAuthModal } = useAuth();
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState<
    "login" | "signup" | "forgotPassword"
  >("login");

  if (!isVisible) {
    return null;
  }

  const handleTabChange = (tab: "login" | "signup" | "forgotPassword") => {
    setActiveTab(tab);
  };

  const handleLoginTab = () => setActiveTab("login");
  const handleSignupTab = () => setActiveTab("signup");
  const handleForgotPassword = () => setActiveTab("forgotPassword");
  const ModalLabel =
    activeTab === "forgotPassword"
      ? "Reset Password :"
      : activeTab === "signup"
      ? "Sign Up"
      : "Login:";

  const handleClose = () => {
    closeAuthModal();
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const user = await loginUser(email, password);
      console.log("User logged in:", user);
      handleClose();
    } catch (error) {
      throw error;
    }
  };

  const handleSignup = async (data: IFormSignUp) => {
    try {
      await signupUser(data.email, data.password);
      return true;
    } catch (error: any) {
      throw error;
    } finally {
    }
  };

  return (
    <Drawer isOpen={isVisible}>
      <Col bg={theme.neutralColor.bgContainer} br={"0.5rem 0.5rem 0 0 "}>
        <Row a="center" j="between">
          <Text s="16" w={5} ml="1rem" c={theme.brandColor.primary}>
            {ModalLabel}
          </Text>
          <Button variant="secondary" padding="1rem">
            <Icon
              width={1}
              height={1}
              name={IconName.Close}
              onClick={handleClose}
            />
          </Button>
        </Row>
        <Col gap="1rem" p={"0 1.25rem 1.25rem"}>
          {activeTab === "login" && (
            <Login
              onLogin={handleLogin}
              onForgotPassword={handleForgotPassword}
              onNavigateSignup={handleSignupTab}
            />
          )}
          {activeTab === "signup" && (
            <Signup
              onSignUp={handleSignup}
              onNavigateLogin={() => handleTabChange("login")}
            />
          )}
        </Col>
      </Col>
    </Drawer>
  );
};

export default AuthModal;
