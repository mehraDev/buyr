import React from "react";
import { useTheme } from "styled-components";
import Icon, { IconName } from "ui/Icon";
import { Backdrop } from "ui/Backdrop";
import { Text, Row, Col } from "ui/basic";
import { IContactItem } from "app/interfaces/Shop/Contacts";

export interface IContactButtonOverlay {
  iconName: IconName;
  contact: IContactItem;
  color: string;
}
interface IContactPopup {
  onContact: (index: number) => void;
  contactButtons: IContactButtonOverlay[];
  onClose: () => void;
  name: string;
}

const ContactPopup: React.FC<IContactPopup> = ({
  onContact,
  onClose,
  contactButtons,
  name,
}) => {
  const theme = useTheme();
  return (
    <Backdrop>
      <Row
        style={{
          zIndex: 11,
          position: "absolute",
          bottom: 0,
          padding: " 0.5rem 0.5rem 1rem",
        }}
      >
        <Col
          style={{
            background: theme.neutralColor.bgContainer,
            borderRadius: "6px",
            boxShadow: theme.shadow.boxShadow,
          }}
          p="1rem"
        >
          <Row a="center" p="0rem 0 1rem" j="between">
            <Text s="20" w={6} tt="cap">
              {name}
            </Text>
            <Icon
              borderRadius={0.35}
              name={IconName.Close}
              color={contactButtons[0].color}
              width={1.4}
              height={1.4}
              onClick={() => onClose()}
            />
          </Row>
          <Col p="0.5rem" style={{ gap: "0.5rem" }}>
            {contactButtons &&
              contactButtons.length &&
              contactButtons.map((contact, index) => (
                <Row
                  key={index}
                  style={{
                    border: "1px solid" + theme.neutralColor.border,
                    borderRadius: "6px",
                    gap: "1rem",
                  }}
                  onClick={() => onContact(index)}
                  a="center"
                  p="0.5rem 1rem"
                >
                  <Icon
                    borderRadius={0.35}
                    name={contact.iconName}
                    color={contact.color}
                    width={1.4}
                    height={1.4}
                  />
                  <Text>{contact.contact.name}</Text>
                </Row>
              ))}
          </Col>
        </Col>
      </Row>
    </Backdrop>
  );
};

export default ContactPopup;
