import React from "react";
import { DashboardHeaderControlsWrapper, ShopNameWrapper } from "./styles";
import { NotificationIcon, ProfileIcon } from "./Controls";

import { DashboardHeaderWrapper } from "./styles";
import StatusDot from "./Status";
import { signOut } from "firebase/auth";
import { auth } from "firebaseServices/firebase";


interface DashboardHeaderProps {
  onLogout: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onLogout }) => {

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <DashboardHeaderWrapper className="header">
      <ShopNameWrapper>
        <h4>Panj Tara Dhaba</h4>
        <span>Online</span>
        <StatusDot isOnline={true}/>
      </ShopNameWrapper>
      <DashboardHeaderControlsWrapper>
       <NotificationIcon/>
       <ProfileIcon user="abhi" isShopOnline={true} onToggleShopOnline={() => console.log()} onLogout={handleLogout} />
      </DashboardHeaderControlsWrapper>
    </DashboardHeaderWrapper>
    
  );
};


