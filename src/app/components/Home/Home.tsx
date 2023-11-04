import { useTheme } from "styled-components";
import Button from "ui/Button";
import { Col, Row, Text } from "ui/basic";

const Home = () => {
  const theme = useTheme();
  return (
    <>
      <Col j="center" a="center" p="2rem">
        <Col
          style={{
            boxShadow: theme.shadow.boxShadowSecondary,
            gap: "2rem",
            borderRadius: "12px",
          }}
          w="initial"
          h=""
          p={"4rem"}
        >
          <Row a="center" j="center">
            <Text s="24" w={7}>
              {" "}
              digibhoomi
            </Text>
          </Row>
          <Row a="center" j="center">
            <Text>
              <a
                href="https://seller.digibhoomi.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  padding="1rem"
                  bg="black"
                  style={{ borderRadius: "12px" }}
                >
                  Become Digibhoomi seller
                </Button>
              </a>
            </Text>
          </Row>
        </Col>
      </Col>
    </>
  );
};

export default Home;
