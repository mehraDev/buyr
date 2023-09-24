import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supportedShopsList from "app/components/ProductCatalog";
import { ISellerProfile } from "app/interfaces";
import SplashScreen from "app/components/ProductCatalog/SplashScreen/SplashScreen";
import getSellerProfileByUser from "app/services/Seller/Profile/getSellerProfileByUser";

const Seller: React.FC = () => {
  const { sellerUserId } = useParams();
  const [profile, setProfile] = useState<ISellerProfile | null>(null);

  useEffect(() => {
    const fetchSellerProfile = async () => {
      if (sellerUserId) {
        try {
          const sellerProfile = await getSellerProfileByUser(sellerUserId);
          setProfile(sellerProfile);
        } catch (error) {
          console.error("Failed to fetch seller profile:", error);
        }
      }
    };
    fetchSellerProfile();
  }, [sellerUserId]);
  // useEffect(() => {
  //   const fetchShopType = async () => {
  //     if (sellerId) {
  //       try {
  //         const profile = await getProfileById(sellerId);
  //         if (profile) {
  //           setProfile(profile);
  //         } else {
  //           console.log("Shop Type not found for seller:", sellerId);
  //         }
  //       } catch (error) {
  //         console.error("Failed to fetch shop type:", error);
  //       }
  //     }
  //   };

  //   fetchShopType();
  // }, [sellerId]);
  if (!profile) {
    return <SplashScreen />;
  }

  const StaticShop = supportedShopsList[profile.type];

  if (!StaticShop) {
    return <div>Invalid Shop Type</div>;
  }
  console.log(profile);
  return (
    <div>
      <StaticShop profile={profile} />
    </div>
  );
};

export default Seller;
