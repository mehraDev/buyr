import React, { useEffect, useState, useRef } from "react";
import { Box, Col } from "ui/basic";
import { fetchImageFromStorage } from "firebaseServices/storage";
import { useTheme } from "styled-components";
import ProfileCard from "../../ProfileCard/ProfileCard";
import getProducts from "app/services/Menu/getProducts";
import SplashScreen from "../../SplashScreen/SplashScreen";
import { IProductFood, ISellerProfile } from "app/interfaces";
import FoodMenu from "./FoodMenu";
import MenuHeader from "../../MenuHeader/MenuHeader";
import { Sticky } from "ui/Sticky";
import { SellerIdProvider } from "../../SellerIdContext";

interface IFoodCatalog {
  id: string;
  profile: ISellerProfile;
}

const FoodCatalog: React.FC<IFoodCatalog> = ({ id, profile }) => {
  const [profileImageUrl, setProfileImageUrl] = useState<string | undefined>(
    undefined
  );
  console.log(profile);
  const [products, setProducts] = useState<IProductFood[]>([]);
  const [, setImageUrl] = useState("");
  const { shopName, about, address } = profile;
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const profileCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProfileImageURL = async () => {
      const folderPath = `s/food/usr/${id}`;
      const imageName = "profile.png";
      try {
        const url = await fetchImageFromStorage(folderPath, imageName);
        setProfileImageUrl(url);
      } catch (error) {
        console.log("Error fetching profile image:", error);
      }
    };
    const fetchProducts = async () => {
      try {
        const products = await getProducts(id);
        setProducts(products || []);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    fetchProfileImageURL();
    fetchProducts();
  }, [id]);
  const theme = useTheme();

  useEffect(() => {
    const fetchImageUrl = async () => {
      const folderPath = `s/food/usr/${id}/p`;
      const imageName = "pastery-strawberry.jpg";
      try {
        const url = await fetchImageFromStorage(folderPath, imageName);
        setImageUrl(url);
      } catch (error) {
        console.log("Error fetching profile image:", error);
      }
    };
    if (id && products && products.length) {
      fetchImageUrl();
    }
  }, [products, id]);

  const MENU_HEADER_HEIGHT = 32;
  const profileCardBottom = profileCardRef.current
    ? profileCardRef.current.offsetHeight
    : 0;
  const stickyPointHeader = profileCardBottom - MENU_HEADER_HEIGHT;
  const stickyPointMenu = stickyPointHeader;

  return (
    <SellerIdProvider sellerId={id}>
      <>
        <SplashScreen
          name={profile.shopName}
          tagline={"We make delicious moments for you"}
        />
        <Col
          p="0 0 2rem"
          m={[0]}
          ref={containerRef}
          style={{
            height: "100vh",
            overflowY: "scroll",
            position: "fixed",
            background: theme.neutralColor.fillQuaternary,
          }}
        >
          <Sticky
            height={MENU_HEADER_HEIGHT}
            at={stickyPointHeader}
            stickyStyle={{ opacity: 1, position: "fixed" }}
            style={{ opacity: 0, position: "fixed" }}
            containerRef={containerRef}
            parentRef={headerRef}
          >
            <MenuHeader name={shopName} />
          </Sticky>

          <Box ref={profileCardRef}>
            <ProfileCard profile={profile} image={profileImageUrl} />
          </Box>

          <FoodMenu
            products={products}
            stickyPoint={stickyPointMenu}
            container={containerRef}
            stickyOffset={MENU_HEADER_HEIGHT}
          />
        </Col>
      </>
    </SellerIdProvider>
  );
};

export default FoodCatalog;
