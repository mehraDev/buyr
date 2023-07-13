import React from "react";
import Icon, { IconName } from "ui/Icon";

interface IContactCard {}

const ContactCard: React.FC<IContactCard> = () => {
  const phoneColor = "#006AFF";
  const waColor = "#1dc059";
  const fbColor = "#0a59c1";
  const igColor = "#f22066";

  const handlePhoneClick = () => {
    const phoneNumber = "9467904967";
    window.location.href = `tel:${phoneNumber}`;
  };
  const handleWhatsAppClick = () => {
    const phoneNumber = "9467904967"; // Replace with the actual phone number
    window.open(`https://wa.me/${phoneNumber}`, "_blank");
  };
  return (
    <>
      <Icon
        borderRadius={0.35}
        name={IconName.Phone}
        color={phoneColor}
        width={1.2}
        height={1.2}
        onClick={handlePhoneClick}
        padding="4px"
      />
      <Icon
        borderRadius={0.35}
        name={IconName.Whatsapp}
        width={1.2}
        height={1.2}
        color={waColor}
        onClick={handleWhatsAppClick}
        padding="4px"
      />
      <Icon
        borderRadius={0.35}
        name={IconName.Instagram}
        width={1.2}
        height={1.2}
        color={igColor}
        padding="4px"
      />
      <Icon
        borderRadius={0.35}
        name={IconName.Facebook}
        color={fbColor}
        width={1.2}
        height={1.2}
        padding="4px"
      />
      {/* <Icon
        name={IconName.Location}
        width={1.5}
        color={phoneColor}
        borderRadius={0.35}
        height={1.5}
      /> */}
    </>
  );
};

export default ContactCard;
