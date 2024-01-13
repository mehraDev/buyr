import React, { useEffect, useState } from "react";
import { Col, Row, Text } from "ui/basic";
import { Cart } from "../../../Cart/Food/FoodCartContext";
import placeOrder from "app/services/Seller/order/food/placeOrder";
import Button from "ui/Button";
import DeliveryAddress from "./DeliveryAddress";
import OrderList from "./OrderList";
import Icon, { IconName } from "ui/Icon";
import { useTheme } from "styled-components";
import { Address } from "app/interfaces";
import { getAddress } from "app/components/Seller/services/Profile/Address/address";
import { auth } from "firebaseServices/firebase";

interface FoodOrderSummaryProps {
  cart: Cart;
  onClose: () => void;
}

const FoodOrderSummary: React.FC<FoodOrderSummaryProps> = ({
  cart,
  onClose,
}) => {
  const theme = useTheme();
  const [address, setAddress] = useState<Address | undefined>(undefined);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const fetchedAddress = await getAddress(auth.currentUser?.uid || "");
        setAddress(fetchedAddress ? fetchedAddress[0] : undefined);
      } catch (error) {
        console.error("Failed to fetch address: ", error);
        // Handle error appropriately
      }
    };

    // Call the fetchAddress function
    fetchAddress();
  }, []);
  const calculateOrderTotal = () => {
    return cart.items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };
  const checkout = () => {
    placeOrder();
  };

  const Header = () => (
    <Row p={"1rem"} j="center" a="center">
      <Text s="16" w={6} c={theme.brandColor.primary}>
        Order Summary
      </Text>
      <Icon
        name={IconName.GoBack}
        style={{ position: "absolute", left: "0.5rem" }}
        onClick={onClose}
      />
    </Row>
  );
  return (
    <Col
      style={{ background: theme.neutralColor.bgContainer }}
      h="100%"
      j="between"
    >
      <Header />
      <Col gap="1rem" p={"0 1rem"} h="100%" style={{ overflow: "scroll" }}>
        <DeliveryAddress address={address} />
        <OrderList items={cart.items} />
        <Row m={"0 3 "} j="between">
          <Text>Order Total</Text>
          <Text>{calculateOrderTotal()}</Text>
        </Row>
        <Row>
          <Col>
            <Text>Payment Information</Text>
          </Col>
          <Col></Col>
        </Row>
      </Col>
      <Col p={"1rem"}>
        <Button width="100%" onClick={checkout} padding="1rem" size="large">
          Checkout
        </Button>
      </Col>
    </Col>
  );
};

export default FoodOrderSummary;
