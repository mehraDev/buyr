import React from "react";
import { useTheme } from "styled-components";
import Button from "ui/Button";
import Icon, { IconName } from "ui/Icon";
import { Col, Row, Text } from "ui/basic";

interface ISellerNotFoundPage {
  onHomeClick: () => void;
}

const SellerNotFoundPage: React.FC<ISellerNotFoundPage> = ({ onHomeClick }) => {
  const theme = useTheme();
  return (
    <Col p={"2rem"} style={{ gap: "1rem" }}>
      <Row>
        <Text s="24" w={6} c={theme.neutralColor.text}>
          Seller Not Found
        </Text>
      </Row>
      <Row>
        <Text s="14" w={4} c={theme.neutralColor.textSecondary}>
          Sorry, the seller you are looking for was not found.
        </Text>
      </Row>
      <Row>
        <Button
          variant="secondary"
          onClick={onHomeClick}
          padding="0.5rem 1rem"
          style={{ alignItems: "end" }}
        >
          <Icon name={IconName.Home}></Icon>
          <Text>Home</Text>
        </Button>
      </Row>
    </Col>
  );
};

export default SellerNotFoundPage;
