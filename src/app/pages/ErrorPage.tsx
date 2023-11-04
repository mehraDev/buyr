import React from "react";
import { useTheme } from "styled-components";
import Button from "ui/Button";
import Icon, { IconName } from "ui/Icon";
import { Col, Row, Text } from "ui/basic";

interface IErrorPage {
  title: string;
  message: string;
  onHomeClick: () => void;
}

const ErrorPage: React.FC<IErrorPage> = ({ title, message, onHomeClick }) => {
  const theme = useTheme();
  const buttonStyle = {
    padding: "0.5rem 1rem",
    alignItems: "end",
  };
  return (
    <Col p={"2rem"} style={{ gap: "1rem" }}>
      <Row>
        <Text s="24" w={6} c={theme.neutralColor.text}>
          {title}
        </Text>
      </Row>
      <Row>
        <Text s="14" w={4} c={theme.neutralColor.textSecondary}>
          {message}
        </Text>
      </Row>
      <Row>
        <Button variant="secondary" onClick={onHomeClick} style={buttonStyle}>
          <Icon name={IconName.Home}></Icon>
          <Text>Home</Text>
        </Button>
      </Row>
    </Col>
  );
};

export default ErrorPage;
