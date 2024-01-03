import React, { useState } from "react";
import { useTheme } from "styled-components";
import Button from "ui/Button";
import { InputInteger, InputPhoneNumber, InputText } from "ui/Form";
import InputPassword from "ui/Form/Inputs/InputPassword";
import Icon, { IconName } from "ui/Icon";
import { Col, Row, Text } from "ui/basic";

interface LoginProps {
  onLogin: (email: string, password: string) => void;
  onForgotPassword: () => void;
  onNavigateSignup: () => void;
}

const Login: React.FC<LoginProps> = ({
  onLogin,
  onForgotPassword,
  onNavigateSignup,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const theme = useTheme();
  const handleLogin = async () => {
    setLoading(true);
    onLogin(email, password);
    setLoading(false);
  };

  return (
    <>
      <InputText
        value={email}
        onChange={(val) => setEmail(val)}
        type="email"
        required={true}
        labelTop={true}
        label="Email"
        placeholder="Enter your email"
      />
      <InputPassword
        // error=""
        labelTop={true}
        // type="password"
        // onBlur={}
        type="current"
        label="Password"
        required={true}
        value={password}
        placeholder="Password"
        onChange={(val) => setPassword(val)}
      />
      <Row j="between">
        <Button variant="secondary" padding="0.5" onClick={onForgotPassword}>
          <Text s="12" style={{ textDecoration: "underline" }}>
            Forgot Password
          </Text>
        </Button>
        <Button variant="secondary" padding="0.5" onClick={onNavigateSignup}>
          <Text s="12" style={{ textDecoration: "underline" }}>
            Signup
          </Text>
        </Button>
      </Row>
      <Button width="100%" onClick={handleLogin} padding="1rem" size="large">
        Login
      </Button>
    </>
  );
};

export default Login;
