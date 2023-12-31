import React, { useEffect, useState, useRef } from "react";
import { Box, Col, Row, Text } from "ui/basic";
import { useTheme } from "styled-components";
import ProfileCard from "../../ProfileCard/ProfileCard";
import SplashScreen from "../../SplashScreen/SplashScreen";
import { IProductFood, ISellerProfile } from "app/interfaces";
import FoodMenu from "./FoodMenu";
import getProductsFoodByID from "app/services/Seller/Products/getFoodProducts";
import { ISellerContacts } from "app/interfaces/Shop/Contacts";
import getSellerContactsById from "app/services/Seller/Profile/Contacts/getSellerContacts";
import { getSellerLogoByID } from "app/services/Seller/Profile";
import { Drawer } from "ui/Drawer";
import categoriseProducts from "./utils/categoriseProducts";
import { useAuthModal } from "app/contexts/useAuthModal";
import Icon, { IconName } from "ui/Icon";

interface IShopTemplateFood {
  profile: ISellerProfile;
}

const ShopTemplateFood: React.FC<IShopTemplateFood> = ({ profile }) => {
  const { id: sellerID, user } = profile;
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<ISellerContacts | null>(null);
  const [products, setProducts] = useState<IProductFood[]>([]);
  const [containerHeight, setContainerHeight] = useState("100vh");

  const theme = useTheme();

  const logoUrl = getSellerLogoByID(sellerID);
  const { name: shopName } = profile;
  const containerRef = useRef<HTMLDivElement>(null);
  const profileCardRef = useRef<HTMLDivElement>(null);
  const { isAuthModalOpen, hideAuthModal } = useAuthModal();
  console.log(!isAuthModalOpen);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProducts = await getProductsFoodByID(sellerID);
        setProducts(fetchedProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchData();
    const fetchContacts = async () => {
      try {
        const fetchedContacts = await getSellerContactsById(sellerID);
        setContacts(fetchedContacts);
      } catch (error) {
        console.error("Error fetching seller contacts:", error);
      }
    };

    fetchContacts();
  }, [sellerID]);

  const profileCardHeight = profileCardRef.current
    ? profileCardRef.current.offsetHeight
    : 0;

  const stickyPointHeader = profileCardHeight;

  useEffect(() => {
    const calculateDynamicHeight = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      return `${vh}px`;
    };

    const updateContainerHeight = () => {
      const newDynamicHeight = calculateDynamicHeight();
      setContainerHeight(newDynamicHeight);
    };

    window.addEventListener("resize", updateContainerHeight);
    setContainerHeight(calculateDynamicHeight());

    return () => {
      window.removeEventListener("resize", updateContainerHeight);
    };
  }, [containerHeight]);

  const categoryCounts: { [category: string]: number } = {};
  products.forEach((product) => {
    if (product.category) {
      let cat;
      if (typeof product.category === "string") {
        cat = product.category;
      } else {
        cat = product.category[0];
      }
      if (categoryCounts[cat]) {
        categoryCounts[cat]++;
      } else {
        categoryCounts[cat] = 1;
      }
    } else {
      if (categoryCounts["Others"]) {
        categoryCounts["Others"]++;
      } else {
        categoryCounts["Others"] = 1;
      }
    }
  });

  console.log(categoriseProducts(products));

  return (
    <>
      <SplashScreen name={shopName} timer={1} />
      <Col
        ref={containerRef}
        m={[0]}
        style={{
          height: containerHeight,
        }}
      >
        <Col style={{ background: "white" }}>
          <Box ref={profileCardRef} p={"1.5rem 1rem"}>
            <Col
              a="center"
              style={{
                gap: "1rem",
              }}
            >
              <ProfileCard
                contacts={contacts}
                profile={profile}
                logo={logoUrl}
              />
            </Col>
          </Box>

          <Row
            style={{ borderTop: `1px solid #F7F7F7`, minHeight: "100vh" }}
            h="100%"
          >
            <FoodMenu products={products} />
          </Row>
        </Col>
        <Drawer isOpen={isAuthModalOpen ? true : false}>
          <Col style={{ background: theme.neutralColor.bgContainer }} p="1rem">
            <Row p={"1rem"} j="between">
              <Text>Login to continure</Text>
              <Icon name={IconName.Close} onClick={hideAuthModal} color="red" />
            </Row>

            <Row p={"1rem"}>Please Login</Row>
          </Col>
        </Drawer>
      </Col>
    </>
  );
};

export default ShopTemplateFood;
