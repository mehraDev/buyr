import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Col, Row, Text } from "ui/basic";
interface ISplashScreen {
  name?: string;
  tagline?: string;
}

const SplashScreen: React.FC<ISplashScreen> = ({ name, tagline }) => {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowWelcome(false);
    }, 1000);

    const cleanup = () => {
      clearTimeout(timeout);
    };

    return cleanup;
  }, []);

  if (!showWelcome) {
    return null;
  }

  return (
    <Wrapper
      showWelcome={showWelcome}
      onAnimationEnd={() => setShowWelcome(false)}
    >
      <Col w="80%" j="between" style={{ height: "100%" }}>
        {name && (
          <Row j="center" a="end" style={{ height: "100%" }}>
            <Text w={6} s="24" type="heading" tt="cap" c="#fff" mb="2rem">
              {name}
            </Text>
          </Row>
        )}
        {name && tagline && (
          <Row j="center" a="end" style={{ height: "100%" }}>
            <Text
              w={5}
              s="22"
              c="#fff"
              mb="2rem"
              style={{ fontFamily: "cursive" }}
            >
              {tagline}
            </Text>
          </Row>
        )}
      </Col>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ showWelcome: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
  display: flex;
  z-index: 1000;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #d31027, #ea384d);
  font-size: 24px;
`;

export default SplashScreen;
