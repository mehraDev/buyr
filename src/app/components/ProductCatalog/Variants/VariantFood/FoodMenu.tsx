import { InputSearch } from "ui/Form";
import { Col, Row, Text } from "ui/basic";
import CategoryViewer from "./CategoryViewer";
import styled, { useTheme } from "styled-components";
import { useState, useRef } from "react";
import { IProductFood } from "app/interfaces";
import { Sticky } from "ui/Sticky";
import { Backdrop } from "ui/Backdrop";

interface IFoodMenu {
  products: IProductFood[];
  stickyPoint?: number;
  container: React.RefObject<HTMLDivElement>;
  stickyOffset?: number;
}

const FoodMenu: React.FC<IFoodMenu> = ({
  products,
  stickyPoint = 0,
  container,
  stickyOffset,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenu, setIsMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");

  const SEARCH_HEIGHT = 56;
  const STICKY_SEARCH_HEIGHT = 48;

  const theme = useTheme();
  const filterProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    if (container.current) {
      container.current.scrollTo({ top: stickyPoint + 1, behavior: "smooth" });
    }
  };
  const categoryRefs: { [category: string]: React.RefObject<HTMLDivElement> } =
    {};

  const handleMenuClick = (index: number) => {
    const categoryKey = Object.keys(categoryCounts)[index];
    const categoryRef = categoryRefs[categoryKey];
    if (categoryRef.current && container.current) {
      const categoryOffset = categoryRef.current.offsetTop;
      container.current.scrollTo({ top: categoryOffset, behavior: "smooth" });
    }
    setIsMenu(false);
  };

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

  return (
    <Col p="0 0 5rem">
      <Row h={`${SEARCH_HEIGHT}px`}>
        <Sticky
          height={SEARCH_HEIGHT}
          containerRef={container}
          at={stickyPoint}
          stickyStyle={{
            position: "fixed",
            zIndex: "2",
            top: `${stickyOffset}px`,
            background: theme.neutralColor.bgContainer,
            padding: "0rem 1.5rem 0.5rem",
            height: `${SEARCH_HEIGHT - 8}px`,
          }}
          style={{
            background: theme.neutralColor.bgContainer,
            padding: "0.5rem 1.5rem 0.5rem",
          }}
        >
          <Row h={`${SEARCH_HEIGHT}px`} ref={searchInputRef}>
            <InputSearch
              placeholder="Search for items"
              value={searchTerm}
              onChange={handleSearch}
              onClear={() => setSearchTerm("")}
            />
          </Row>
        </Sticky>
      </Row>
      <Col p="1rem 0rem 2rem">
        <CategoryViewer
          onActive={(value) => {
            setActiveCategory(value);
          }}
          stickyOffset={(stickyOffset || 0) + STICKY_SEARCH_HEIGHT}
          stickyParent={container}
          query={searchTerm}
          products={filterProducts}
          onCategoryRef={(category, ref) => (categoryRefs[category] = ref)}
        />
      </Col>
      <Menu
        onClick={() => setIsMenu(!isMenu)}
        style={{ zIndex: isMenu ? 10 : "" }}
      >
        <Text s="14" tt="cap" w={6}>
          Menu
        </Text>
      </Menu>
      {isMenu && (
        <Backdrop>
          <Col h="100%" p="4rem 2rem">
            <Col
              h="100%"
              p="2rem"
              style={{
                background: theme.neutralColor.bgContainer,
                boxShadow: theme.shadow.boxShadowSecondary,
                borderRadius: "6px",
              }}
            >
              <Text s="24" w={7} type="heading">
                Menu
              </Text>
              <Col>
                {Object.entries(categoryCounts).map(([category], index) => (
                  <Row p="1rem 0" onClick={() => handleMenuClick(index)}>
                    <Text
                      key={category}
                      s="14"
                      w={6}
                      c={
                        activeCategory === category ||
                        (!activeCategory && index === 0)
                          ? theme.brandColor.primary
                          : theme.neutralColor.textSecondary
                      }
                    >
                      {category.split("_").join(" ")}
                    </Text>
                  </Row>
                ))}
              </Col>
            </Col>
          </Col>
        </Backdrop>
      )}
    </Col>
  );
};

const Menu = styled.div`
  background: #e91e63;
  position: fixed;
  width: initial;
  padding: 1rem 1.5rem;
  color: white;
  border-radius: 6px;
  bottom: 1rem;
  z-index: 1;
  left: 40%;
`;

export default FoodMenu;
