import { IProductFood } from "app/interfaces";
import React from "react";
import { useTheme } from "styled-components";
import { Col, Row, Text } from "ui/basic";
import { CartItem } from "../../Cart/Food/FoodCartContext";

interface OrderListProps {
  items: CartItem[];
}

const OrderList: React.FC<OrderListProps> = ({ items }) => {
  const theme = useTheme();
  const Header = () => (
    <Row j="between" a="center">
      <Text w={5}>Order Summary</Text>
    </Row>
  );

  const ItemsList = () => (
    <Col gap="0.5rem" p={"0 0.5rem"}>
      {items.map((item, index) => (
        <Row j="between" a="center" key={index}>
          <Col gap="0.25rem" w="90%">
            <Text s="14">{item.name}</Text>
            <Text s="14">{item.price}</Text>
          </Col>
          <Row w="initial" a="end">
            <Text s="12" c={theme.brandColor.primary} w={7}>
              x
            </Text>
            <Text s="14" c={theme.brandColor.primary}>
              {item.quantity}
            </Text>
          </Row>
        </Row>
      ))}
    </Col>
  );
  return (
    <Col gap="1rem">
      <Header />
      <ItemsList />
    </Col>
  );
};

export default OrderList;
