import React, { useEffect, useState, useRef, useCallback } from "react";
import { Box, Col, Row, Text } from "ui/basic";
import { useTheme } from "styled-components";
import ProfileCard from "../../ProfileCard/ProfileCard";
import SplashScreen from "../../SplashScreen/SplashScreen";
import { IProductFood, ISellerProfile } from "app/interfaces";
import FoodMenu from "./FoodMenu";
import MenuHeader, { MENU_HEADER_HEIGHT } from "../../MenuHeader/MenuHeader";
import getProductsFoodByID from "app/services/Seller/Products/getFoodProducts";
import { ISellerContacts } from "app/interfaces/Shop/Contacts";
import getSellerContactsById from "app/services/Seller/Profile/Contacts/getSellerContacts";
import MenuButton from "./components/MenuButton";
import { getSellerLogoByID } from "app/services/Seller/Profile";
import { Drawer } from "ui/Drawer";
import { SearchCard } from "ui/Search";
import ItemFoodCard from "./FoodItemCard";
interface IShopTemplateFood {
  profile: ISellerProfile;
}

const ShopTemplateFood: React.FC<IShopTemplateFood> = ({ profile }) => {
  const { id: sellerID, user } = profile;
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<ISellerContacts | null>(null);
  const [products, setProducts] = useState<IProductFood[]>([]);
  const [containerHeight, setContainerHeight] = useState("100vh");
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [isSearch, setIsSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const theme = useTheme();

  const logoUrl = getSellerLogoByID(sellerID);
  const { name: shopName } = profile;
  const containerRef = useRef<HTMLDivElement>(null);
  const profileCardRef = useRef<HTMLDivElement>(null);

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

  const scrollContainer = window;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        scrollContainer instanceof HTMLElement
          ? scrollContainer.screenTop
          : scrollContainer.scrollY;
      let newActiveCategory = "";
      for (const [category, position] of Object.entries(
        categoryPositionsRef.current
      )) {
        if (scrollPosition >= position - MENU_HEADER_HEIGHT) {
          newActiveCategory = category;
        }
      }
      setActiveCategory(newActiveCategory);
    };
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => {
        scrollContainer.removeEventListener("scroll", handleScroll);
      };
    }
  }, [scrollContainer]);
  const categoryPositionsRef = useRef<{ [category: string]: number }>({});

  const handleCategoryPosition = useCallback(
    (category: string, position: number) => {
      categoryPositionsRef.current[category] = position;
    },
    []
  );
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
  const handleShowSearch = () => {
    setIsSearch(true);
  };
  const handleCategoryClick = (category: string) => {
    const position = categoryPositionsRef.current[category.toLowerCase()];
    if (position !== undefined) {
      window.scrollTo({
        top: position,
        behavior: "smooth",
      });
    }
  };

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
        <Col style={{ background: "#fff2f3" }}>
          <MenuHeader
            name={activeCategory}
            onSearch={handleShowSearch}
            stickyPointHeader={stickyPointHeader}
          />
          <Box ref={profileCardRef} p={"1rem"}>
            <Col
              a="center"
              p={"2rem"}
              br="16px"
              style={{
                gap: "0.5rem",
                background: theme.neutralColor.bgContainer,
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1)",
                position: "relative",
              }}
            >
              <ProfileCard
                contacts={contacts}
                profile={profile}
                logo={logoUrl}
              />
            </Col>
          </Box>

          <FoodMenu
            onCategoryPositionsUpdate={handleCategoryPosition}
            products={products}
            onSearch={handleShowSearch}
          />
          <MenuButton
            activeCategory={activeCategory}
            onCategoryClick={handleCategoryClick}
            categoryCounts={categoryCounts}
          />
          <Drawer isOpen={isSearch} h="98%">
            <SearchCard
              onClose={() => setIsSearch(false)}
              searchItems={products}
              filterField={(item) => item.name.toLowerCase()}
              searchQuery={searchTerm}
              onSearch={(q) => setSearchTerm(q.toLowerCase())}
            >
              {(product, index) => (
                <Row
                  key={index}
                  p={"1rem 0.5rem "}
                  br="0"
                  style={{
                    borderBottom: `1px dashed #c5c5c5`,
                    background: theme.neutralColor.bgContainer,
                  }}
                >
                  <ItemFoodCard item={product} />
                </Row>
              )}
            </SearchCard>
          </Drawer>
        </Col>
      </Col>
    </>
  );
};

export default ShopTemplateFood;
