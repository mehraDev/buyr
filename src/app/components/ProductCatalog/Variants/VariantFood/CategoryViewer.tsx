import { Col, Grid, Row, Text } from "ui/basic";
import FoodItemCard from "./FoodItemCard";
import Icon, { IconName } from "ui/Icon";
import { useTheme } from "styled-components";
import { IProductFood } from "app/interfaces";
import { useEffect, useRef, useState } from "react";
import { Sticky } from "ui/Sticky";
import EmptySearch from "./EmptySearch";
import convertProductsToStructure from "../../services/convertProductToStructures";

interface ICategory {
  onCategoryRef: (
    category: string,
    ref: React.RefObject<HTMLDivElement>
  ) => void;
  onActive?: (val: string) => void;
  category: string;
  filteredProducts: IProductFood[];
  query: string;
  stickyParent: React.RefObject<HTMLDivElement>;
  stickyOffset?: number;
  expandedCategories: { [category: string]: boolean };
  onCategoryToggle: (category: string) => void;
}

const removeUnderscore = (name: string): string => {
  return name.replace(/_/g, " ");
};

const Category: React.FC<ICategory> = ({
  category,
  stickyOffset = 0,
  filteredProducts,
  query,
  stickyParent,
  expandedCategories,
  onCategoryToggle,
  onActive,
  onCategoryRef,
}) => {
  const categoryContainerRef = useRef<HTMLDivElement>(null);
  const isExpanded = expandedCategories[category];
  const theme = useTheme();
  const [stickyAt, setStickyAt] = useState<number>(0);
  const items = filteredProducts.filter(
    (product) => product.category === category
  );

  useEffect(() => {
    const categoryContainer = categoryContainerRef.current;
    const parentScrollTop = stickyParent.current?.scrollTop ?? 0;
    if (categoryContainer) {
      const rect = categoryContainer.getBoundingClientRect();
      const calculatedStickyAt = rect.top + parentScrollTop - stickyOffset;
      setStickyAt(calculatedStickyAt);
      console.log(calculatedStickyAt, "category");
    }
    onCategoryRef(category, categoryContainerRef);
  }, [stickyOffset, expandedCategories, stickyParent, onCategoryRef, category]);

  if (!items || items.length === 0) {
    return null;
  }

  const categoryToggleHandler = () => {
    onCategoryToggle(category);
  };

  const categoryName = removeUnderscore(category);
  return (
    <Col ref={categoryContainerRef}>
      {(!query || query === "") && (
        <Sticky
          height={40}
          containerRef={stickyParent}
          at={stickyAt}
          stickyStyle={{
            zIndex: 1,
            position: "fixed",
            top: stickyOffset,
            boxShadow: theme.shadow.boxShadowSecondary,
            color: theme.brandColor.primaryText,
            fontSize: "14px",
            padding: "0rem 2rem 0rem",
            height: "32px",
            background: theme.neutralColor.bgContainer,
          }}
          style={{
            padding: "0rem 1.5rem",
            background: theme.neutralColor.bgContainer,
            alignItems: "center",
          }}
        >
          <Row style={{}} a="center" j="between">
            <Sticky
              containerRef={stickyParent}
              at={stickyAt}
              stickyStyle={{
                padding: "4px 8px",
                background: theme.brandColor.primary,
                width: "initial",
                color: "#fff",
                fontSize: "12px",
                borderRadius: "6px",
              }}
              style={{
                fontWeight: 600,
                fontFamily: "Raleway",
              }}
              onStickyChange={() => {
                if (onActive) {
                  onActive(category);
                }
              }}
            >
              <Text>{categoryName}</Text>
            </Sticky>
            <Sticky
              containerRef={stickyParent}
              at={stickyAt}
              stickyStyle={{ opacity: 0, width: "initial" }}
              style={{ width: "initial" }}
            >
              <Icon
                clickEffect={false}
                name={IconName.DownArrow}
                onClick={() => categoryToggleHandler()}
                style={{
                  transform: `rotate(${isExpanded ? "180deg" : "0deg"})`,
                  transformOrigin: "center",
                  marginTop: `${isExpanded ? "4px" : "0"}`,
                  marginBottom: `${isExpanded ? "0" : "4px"}`,
                }}
              />
            </Sticky>
          </Row>
        </Sticky>
      )}
      {isExpanded && (
        <Grid
          columns={2}
          mc={[0.4]}
          style={{ backgroundColor: "#f8f8f8" }}
          key={category}
          p="1rem"
        >
          {items.map((product) => (
            <FoodItemCard item={{ ...product }} key={product.id} />
          ))}
        </Grid>
      )}
    </Col>
  );
};

interface ICategoryviewer {
  products: IProductFood[];
  query: string;
  stickyParent: React.RefObject<HTMLDivElement>;
  stickyOffset?: number;
  onActive?: (value: string) => void;
  onCategoryRef: (
    category: string,
    ref: React.RefObject<HTMLDivElement>
  ) => void;
}

const CategoryViewer: React.FC<ICategoryviewer> = ({
  products,
  onActive,
  stickyOffset = 0,
  query,
  stickyParent,
  onCategoryRef,
}) => {
  const categorisedProducts = convertProductsToStructure(products);

  const [expandedCategories, setExpandedCategories] = useState<{
    [category: string]: boolean;
  }>({});

  useEffect(() => {
    const initialExpandedCategories: { [category: string]: boolean } = {};
    const categorisedProducts = convertProductsToStructure(products);
    Object.keys(categorisedProducts).forEach((category) => {
      initialExpandedCategories[category] = true;
    });
    console.log(initialExpandedCategories);
    setExpandedCategories(initialExpandedCategories);
  }, [products]);

  const handleCategoryToggle = (category: string) => {
    setExpandedCategories((prev) => ({ ...prev, [category]: !prev[category] }));
  };
  return (
    <Col>
      {products.length <= 0 ? (
        <EmptySearch />
      ) : (
        Object.keys(categorisedProducts).map((category) => (
          <Category
            onCategoryRef={onCategoryRef}
            onActive={onActive}
            stickyOffset={stickyOffset}
            stickyParent={stickyParent}
            key={`${category}-${query}`}
            query={query}
            category={category}
            filteredProducts={products}
            expandedCategories={expandedCategories}
            onCategoryToggle={handleCategoryToggle}
          />
        ))
      )}
    </Col>
  );
};
export default CategoryViewer;
