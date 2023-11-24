import React, { useState } from "react";
import Icon, { IconName } from "ui/Icon";
import ContactPopup, {
  IContactButtonOverlay,
} from "../ContactPopup/ContactPopup";
import { Row } from "ui/basic";
import { ISellerContacts } from "app/interfaces/Shop/Contacts";

interface IContactCard {
  contacts: ISellerContacts | null;
}

const ContactBar: React.FC<IContactCard> = ({ contacts }) => {
  const [activeOverlay, setActiveOverlay] = useState<
    | IconName.Phone
    | IconName.Whatsapp
    | IconName.Facebook
    | IconName.Instagram
    | ""
  >("");

  if (!contacts) {
    return null;
  }
  const { ph: phone, wa, fb, insta } = contacts;

  const phoneColor = "#2a62f4";
  const waColor = "#009688";
  const fbColor = "#1976d2";
  const igColor = "#e91e63";

  const handleContactClick = (index: number) => {
    if (activeOverlay === IconName.Phone) {
      window.location.href = `tel:${phone[index].value}`;
    } else if (activeOverlay === IconName.Whatsapp) {
      const whatsappNumber = wa[index].value;
      window.location.href = `https://wa.me/${whatsappNumber}`;
    } else if (activeOverlay === IconName.Facebook) {
      const facebookUsername = fb[index].value;
      window.open(`https://www.facebook.com/p/${facebookUsername}`, "_blank");
    } else if (activeOverlay === IconName.Instagram) {
      const instagramUsername = insta[index].value;
      window.open(`https://www.instagram.com/${instagramUsername}`, "_blank");
    }
    setActiveOverlay("");
  };

  const handleIconClick = (
    name:
      | IconName.Phone
      | IconName.Whatsapp
      | IconName.Facebook
      | IconName.Instagram
  ) => {
    setActiveOverlay(name);
  };

  let contactButtons: IContactButtonOverlay[] = [];
  if (activeOverlay === IconName.Phone) {
    contactButtons = phone.map((item) => ({
      contact: { name: item.name, value: item.value },
      color: phoneColor,
      iconName: IconName.Phone,
    }));
  } else if (activeOverlay === IconName.Whatsapp) {
    contactButtons = wa.map((item) => ({
      contact: { name: item.name, value: item.value },
      color: waColor,
      iconName: IconName.Whatsapp,
    }));
  } else if (activeOverlay === IconName.Facebook) {
    contactButtons = fb.map((item) => ({
      contact: { name: item.name, value: item.value },
      color: fbColor,
      iconName: IconName.Facebook,
    }));
  } else if (activeOverlay === IconName.Instagram) {
    contactButtons = insta.map((item) => ({
      contact: { name: item.name, value: item.value },
      color: igColor,
      iconName: IconName.Instagram,
    }));
  }
  const border = `1px solid #d9d9e3`;

  return (
    <Row w="initial" style={{ gap: "12px" }}>
      {phone.length !== 0 && (
        <Icon
          padding="8px"
          borderRadius={0.35}
          style={{ border: border }}
          name={IconName.Phone}
          color={phoneColor}
          width={1.25}
          height={1.25}
          onClick={() => handleIconClick(IconName.Phone)}
        />
      )}
      {wa.length !== 0 && (
        <Icon
          padding="8px"
          borderRadius={0.35}
          style={{ border: border }}
          name={IconName.Whatsapp}
          width={1.25}
          height={1.25}
          color={waColor}
          onClick={() => handleIconClick(IconName.Whatsapp)}
        />
      )}
      {insta.length !== 0 && (
        <Icon
          padding="8px"
          borderRadius={0.35}
          style={{ border: border }}
          name={IconName.Instagram}
          width={1.25}
          height={1.25}
          color={igColor}
          onClick={() => handleIconClick(IconName.Instagram)}
        />
      )}
      {fb.length !== 0 && (
        <Icon
          padding="8px"
          borderRadius={0.35}
          style={{ border: border }}
          name={IconName.Facebook}
          color={fbColor}
          width={1.25}
          height={1.25}
          onClick={() => handleIconClick(IconName.Facebook)}
        />
      )}
      {activeOverlay && (
        <ContactPopup
          onContact={handleContactClick}
          contactButtons={contactButtons}
          onClose={() => setActiveOverlay("")}
          name={activeOverlay}
        />
      )}
    </Row>
  );
};

export default ContactBar;
