import React, { useState } from "react";
import Icon, { IconName } from "ui/Icon";
import ContactPopup, {
  IContactButtonOverlay,
} from "../ContactPopup/ContactPopup";
import { IContactItem } from "app/interfaces/Shop/Profile";

interface IContactCard {
  phone: IContactItem[];
  wa: IContactItem[];
  fb: IContactItem[];
  insta: IContactItem[];
}

const ContactCard: React.FC<IContactCard> = ({ phone, wa, fb, insta }) => {
  const [contactOverlay, setContactOverlay] = useState<
    | IconName.Phone
    | IconName.Whatsapp
    | IconName.Facebook
    | IconName.Instagram
    | ""
  >("");

  const phoneColor = "#0762e1";
  const waColor = "#0ba544";
  const fbColor = "#1166d5";
  const igColor = "#ed1a60";

  const handleContactClick = (index: number) => {
    if (contactOverlay === IconName.Phone) {
      window.location.href = `tel:${phone[index].value}`;
    } else if (contactOverlay === IconName.Whatsapp) {
      const whatsappNumber = wa[index].value;
      window.location.href = `https://wa.me/${whatsappNumber}`;
    } else if (contactOverlay === IconName.Facebook) {
      const facebookUsername = fb[index].value;
      window.open(`https://www.facebook.com/p/${facebookUsername}`, "_blank");
    } else if (contactOverlay === IconName.Instagram) {
      const instagramUsername = insta[index].value;
      window.open(`https://www.instagram.com/${instagramUsername}`, "_blank");
    }
    setContactOverlay("");
  };

  const handleIconClick = (
    name:
      | IconName.Phone
      | IconName.Whatsapp
      | IconName.Facebook
      | IconName.Instagram
  ) => {
    setContactOverlay(name);
  };

  let contactButtons: IContactButtonOverlay[] = [];
  if (contactOverlay === IconName.Phone) {
    contactButtons = phone.map((item) => ({
      contact: { name: item.name, value: item.value },
      color: phoneColor,
      iconName: IconName.Phone,
    }));
  } else if (contactOverlay === IconName.Whatsapp) {
    contactButtons = wa.map((item) => ({
      contact: { name: item.name, value: item.value },
      color: waColor,
      iconName: IconName.Whatsapp,
    }));
  } else if (contactOverlay === IconName.Facebook) {
    contactButtons = fb.map((item) => ({
      contact: { name: item.name, value: item.value },
      color: fbColor,
      iconName: IconName.Facebook,
    }));
  } else if (contactOverlay === IconName.Instagram) {
    contactButtons = insta.map((item) => ({
      contact: { name: item.name, value: item.value },
      color: igColor,
      iconName: IconName.Instagram,
    }));
  }

  return (
    <>
      {phone.length !== 0 && (
        <Icon
          borderRadius={0.35}
          name={IconName.Phone}
          color={phoneColor}
          width={1.4}
          height={1.4}
          onClick={() => handleIconClick(IconName.Phone)}
        />
      )}
      {wa.length !== 0 && (
        <Icon
          borderRadius={0.35}
          name={IconName.Whatsapp}
          width={1.4}
          height={1.4}
          color={waColor}
          onClick={() => handleIconClick(IconName.Whatsapp)}
        />
      )}
      {insta.length !== 0 && (
        <Icon
          borderRadius={0.35}
          name={IconName.Instagram}
          width={1.4}
          height={1.4}
          color={igColor}
          onClick={() => handleIconClick(IconName.Instagram)}
        />
      )}
      {fb.length !== 0 && (
        <Icon
          borderRadius={0.35}
          name={IconName.Facebook}
          color={fbColor}
          width={1.4}
          height={1.4}
          padding="4px"
          onClick={() => handleIconClick(IconName.Facebook)}
        />
      )}
      {contactOverlay && (
        <ContactPopup
          onContact={handleContactClick}
          contactButtons={contactButtons}
          onClose={() => setContactOverlay("")}
          name={contactOverlay}
        />
      )}
    </>
  );
};

export default ContactCard;
