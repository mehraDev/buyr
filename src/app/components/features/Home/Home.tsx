import { getProfile } from "app/components/DashboardHost/services";
import { IProfile } from "app/components/Signup/services";
import { useEffect, useState } from "react";
import styled from "styled-components";
import {  Text } from "ui/basic";
import ProductWidget from "./widgets/ProductWidget";

const ShopName = styled(Text)`
`;


const ShopCardComponent = () => {
  const [profile, setProfile] = useState<IProfile | 0>(0);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const profileData = await getProfile();
        if (profileData !== 0) {
          setProfile(profileData);
        } else {
          setProfile(0);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    }

    fetchProfile();
  }, []);
  
  const shopName = profile !== 0 ? profile.shopName : "My Store";

  return (
    <div>
        <ShopName s="20" w={7} m={[2]} c="#013f54" tt="upp">
          {shopName}
        </ShopName>
        <ProductWidget/>
    </div>
    
  );
};

export default ShopCardComponent;
