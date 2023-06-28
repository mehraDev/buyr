import React, { useState } from "react";


import { NotificationIconWraper, ProfileIconPopupWrapper, ProfileIconWrapper, ToggleWrapper } from "./styles";
import Icon, { IconName } from "ui/Icon";
// import { Notification } from "./Notification";
// import { UserProfile } from "./UserProfile";

interface NotificationIconProps {
}

export const NotificationIcon: React.FC<NotificationIconProps> = () => {
//   const [showNotifications, setShowNotifications] = useState(false);
//   const handleNotificationClick = () => {
//     setShowNotifications(!showNotifications);
//   };

  return (
    <NotificationIconWraper>
        <Icon name={IconName.Notification} color="#071f36"/>
    </NotificationIconWraper>
   
    );
};

interface ProfileIconProps {
  user: string;
  onLogout: () => void;
  onToggleShopOnline: () => void;
  isShopOnline: boolean;
}

export const ProfileIcon: React.FC<ProfileIconProps> = ({
  user,
  onLogout,
  onToggleShopOnline,
  isShopOnline,
}) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleProfileClick = () => {
    setShowPopup(!showPopup);
  };

  return (
    <>
      <ProfileIconWrapper onClick={handleProfileClick}>
        <span>{' ' + user.charAt(0).toLocaleLowerCase() + ' '}</span>
      </ProfileIconWrapper>
      <ProfileIconPopupWrapper show={showPopup}>
        <div onClick={onLogout}>Logout</div>
        <ToggleWrapper>
          <div>Shop Online:</div>
          <input
            type="checkbox"
            checked={isShopOnline}
            onChange={onToggleShopOnline}
          />
        </ToggleWrapper>
      </ProfileIconPopupWrapper>
    </>
  );
};




