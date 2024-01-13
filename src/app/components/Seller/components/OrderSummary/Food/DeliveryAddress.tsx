import { Address } from "app/interfaces";
import React from "react";
import { useTheme } from "styled-components";
import Button from "ui/Button";
import Icon, { IconName } from "ui/Icon";
import { Col, Row, Text } from "ui/basic";

interface DeliveryAddressProps {
  address: Address | undefined;
}

const DeliveryAddress: React.FC<DeliveryAddressProps> = ({ address }) => {
  const theme = useTheme();
  const Header = () => (
    <Row j="between" a="center">
      <Text w={6} s="12">
        Delivering To
      </Text>
      {address && (
        <Button
          variant="secondary"
          size="small"
          padding="0.25rem 0.5rem"
          bg={theme.brandColor.primaryBg}
        >
          Edit
        </Button>
      )}
    </Row>
  );
  const AddressDetails = () => (
    <>
      <Text
        c={theme.neutralColor.textSecondary}
        mb="0.25rem"
        w={5}
        tt="cap"
        s="12"
      >
        {address?.street}
      </Text>
      <Text c={theme.neutralColor.textSecondary} mb="0.5rem" w={5} s="12">
        {address?.city}
      </Text>
      {/* <Text c={theme.neutralColor.textSecondary} tt="cap" s="12" w={5}>
        E, 51 b railway colony sirsa
      </Text> */}
    </>
  );
  const LocationIcon = () => (
    <Row w="initial" br="1rem" bg={theme.brandColor.primaryBg}>
      <Icon
        height={0.8}
        width={0.8}
        name={IconName.Location}
        borderRadius={2}
        color={theme.brandColor.primaryBorder}
      />
    </Row>
  );

  return (
    <Col gap="1rem">
      <Header />
      {address ? (
        <>
          <Row gap="1rem">
            <LocationIcon />
            <AddressDetails />
          </Row>
        </>
      ) : (
        <Button variant="primary" padding="0.5rem 1rem">
          Add Address
        </Button>
      )}
    </Col>
  );
};

export default DeliveryAddress;
