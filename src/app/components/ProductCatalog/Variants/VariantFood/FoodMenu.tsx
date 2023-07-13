import { InputSearch } from "ui/Form";
import { Col, Row, Text } from "ui/basic";
import CategoryViewer from "./CategoryViewer";
import styled, { useTheme } from "styled-components";
import { useState, useRef } from "react";
import { IProductFood } from "app/interfaces";
import convertProductsToStructure from "../../services/convertProductToStructures";
import { Sticky } from "ui/Sticky";

interface IFoodMenu {
  products: IProductFood[];
  offsetTop?: number;
  container: React.RefObject<HTMLDivElement>;
}

const FoodMenu: React.FC<IFoodMenu> = ({ products, offsetTop, container }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const theme = useTheme();
  const filterProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const categorisedProducts = convertProductsToStructure(filterProducts);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    if (container.current) {
      container.current.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  return (
    <Col>
      <Row>
        <Sticky
          containerRef={container}
          at={offsetTop ? offsetTop : 0}
          stickyStyle={{
            position: "fixed",
            zIndex: "1",
            top: "2.5rem",
            boxShadow: theme.shadow.boxShadow,
          }}
          style={{}}
        >
          <Row
            p="0.5rem 0.5rem 1rem"
            style={{
              height: "4rem",
              background: theme.neutralColor.bgContainer,
            }}
            ref={searchInputRef}
          >
            <InputSearch
              placeholder="Search for items"
              value={searchTerm}
              onChange={handleSearch}
              onClear={() => setSearchTerm("")}
            />
          </Row>
        </Sticky>
      </Row>

      <Sticky
        containerRef={container}
        at={offsetTop ? offsetTop : 185}
        stickyStyle={{
          marginTop: "4rem",
        }}
        style={{ marginTop: "0rem" }}
      >
        <Col ref={menuRef}>
          {filterProducts.length <= 0 ? (
            <EmptyList>
              <Row j="center" p="1rem">
                <Text s="16" w={5} c={theme.neutralColor.textSecondary}>
                  {" "}
                  No results found{" "}
                </Text>
              </Row>
            </EmptyList>
          ) : (
            Object.keys(categorisedProducts).map((category) => (
              <CategoryViewer
                key={`${category}-${searchTerm}`}
                query={searchTerm}
                category={category}
                filteredProducts={products}
              />
            ))
          )}
        </Col>
      </Sticky>
    </Col>
  );
};

const EmptyList = styled.div`
  height: 100vh;
  width: 100%;
`;
export default FoodMenu;
