import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supportedShopsList from "app/components/ProductCatalog";
import { getProfileById } from "app/services/Menu";
import getSellerIdFromUserName from "app/services/Menu/getSellerIdFromUserName";
import { ISellerProfile } from "app/interfaces";
import SplashScreen from "app/components/ProductCatalog/SplashScreen/SplashScreen";

const MenuHost: React.FC = () => {
  const { shopId } = useParams();
  const [sellerId, setSellerId] = useState<string | undefined>(undefined);
  const [profile, setProfile] = useState<ISellerProfile | undefined>();

  useEffect(() => {
    const fetchSellerId = async () => {
      if (shopId) {
        try {
          const id = await getSellerIdFromUserName(shopId);
          setSellerId(id ? id : undefined);
        } catch (error) {
          console.error("Failed to fetch seller ID:", error);
        }
      }
    };

    fetchSellerId();
  }, [shopId]);

  useEffect(() => {
    const fetchShopType = async () => {
      if (sellerId) {
        try {
          const profile = await getProfileById(sellerId);
          if (profile && profile.shopType) {
            setProfile(profile);
          } else {
            console.log("Shop Type not found for seller:", sellerId);
          }
        } catch (error) {
          console.error("Failed to fetch shop type:", error);
        }
      }
    };

    fetchShopType();
  }, [sellerId]);

  if (!sellerId || !profile) {
    return <SplashScreen />;
  }

  const StaticShop = supportedShopsList[profile.shopType];

  if (!StaticShop) {
    return <div>Invalid Shop Type</div>;
  }

  return (
    <div>
      <StaticShop id={sellerId} profile={profile} />
    </div>
  );
};

export default MenuHost;
