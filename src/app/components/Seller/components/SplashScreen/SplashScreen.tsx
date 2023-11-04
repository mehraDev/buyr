import React, { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";
import { Col, Text } from "ui/basic";

interface ISplashScreen {
  name?: string;
  timer?: number;
}

const SplashScreen: React.FC<ISplashScreen> = ({ name, timer }) => {
  const [display, setDisplay] = useState(true);
  const theme = useTheme();
  useEffect(() => {
    if (typeof timer === "number") {
      const timeout = setTimeout(() => {
        setDisplay(false);
      }, timer * 1000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [timer]);

  if (!display) {
    return null;
  }

  return (
    <Wrapper>
      <Col j="center" a="center">
        <Text s="24" w={7} tt="cap" c={theme.neutralColor.text}>
          {name}
        </Text>
      </Col>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 1000;
  justify-content: center;
  align-items: center;
  background: white;
`;

export default SplashScreen;
