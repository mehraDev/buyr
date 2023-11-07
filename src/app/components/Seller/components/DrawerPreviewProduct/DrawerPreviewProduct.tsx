import React, { ReactNode } from "react";
import { useTheme } from "styled-components";
import { Drawer } from "ui/Drawer";
import Icon, { IconName } from "ui/Icon";
import { Col, Row } from "ui/basic";

interface IDrawerPreviewProduct {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  bg?: string;
}

const DrawerPreviewProduct: React.FC<IDrawerPreviewProduct> = ({
  isOpen,
  onClose,
  children,
  bg,
}) => {
  const theme = useTheme();

  return (
    <Drawer isOpen={isOpen} h="100%" j="end">
      <Row a="center" j="center" p="1rem">
        <Icon
          style={{ background: theme.neutralColor.bgSpotlight }}
          name={IconName.Close}
          color={theme.neutralColor.bgContainer}
          padding="0.5rem"
          onClick={onClose}
          br="4px"
        />
      </Row>
      <Col
        p="0.75rem"
        br="6px 6px 0 0"
        style={{ background: bg ? bg : theme.neutralColor.bgContainer }}
      >
        {children}
      </Col>
    </Drawer>
  );
};

export default DrawerPreviewProduct;
