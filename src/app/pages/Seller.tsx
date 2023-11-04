import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ISellerProfile } from "app/interfaces";
import SplashScreen from "app/components/Seller/components/SplashScreen/SplashScreen";
import getSellerProfileByUser from "app/services/Seller/Profile/getSellerProfileByUser";
import SellerNotFoundPage from "./SellerNotFoundPage";
import { useNavigate } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import getSellerComponent from "app/components/Seller";

const Seller: React.FC = () => {
  const { sellerUserId } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ISellerProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSellerProfile = async () => {
      if (sellerUserId) {
        try {
          const sellerProfile = await getSellerProfileByUser(sellerUserId);

          setProfile(sellerProfile);
        } catch (err) {
          setError("Failed to fetch seller profile. Please try again later.");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchSellerProfile();
  }, [sellerUserId]);

  const handleHomeClick = () => {
    navigate("/");
  };

  if (loading) {
    return <SplashScreen />;
  }

  if (error) {
    return (
      <ErrorPage
        title="Something Went Wrong"
        message="Sorry, something went wrong while processing your request."
        onHomeClick={handleHomeClick}
      />
    );
  }

  if (!profile) {
    return <SellerNotFoundPage onHomeClick={handleHomeClick} />;
  }

  const StaticShop = getSellerComponent(profile.type);

  if (!StaticShop) {
    return <div>Invalid Shop Type</div>;
  }
  return <StaticShop profile={profile} />;
};

export default Seller;
