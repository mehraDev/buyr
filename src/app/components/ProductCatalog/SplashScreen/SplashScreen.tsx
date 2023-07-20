import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Col, Row, Text } from "ui/basic";
interface ISplashScreen {
  name?: string;
  tagline?: string;
  timer?: number;
}

const SplashScreen: React.FC<ISplashScreen> = ({ name, tagline, timer }) => {
  const [display, setDisplay] = useState(true);

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

const Wrapper = styled.div`
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
