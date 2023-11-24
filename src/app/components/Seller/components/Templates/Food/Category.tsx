import { IProductFood } from "app/interfaces";
import { useRef, useEffect } from "react";
import { useTheme } from "styled-components";
import Icon, { IconName } from "ui/Icon";
import { Col, Row, Text } from "ui/basic";

import React from "react";
import ItemFoodCard from "./FoodItemCard";

interface ICategory {
  products: IProductFood[];
  subCategories: Record<string, ICategory>;
}

interface ICategoryList {
  isTopLevel?: boolean;
  onCategoryPosition?: (category: string, position: number) => void;
  categoryName: string;
  category: ICategory;
  scrollContainer?: React.RefObject<HTMLDivElement>;
  expandedCategories: { [category: string]: boolean };
  onCategoryToggle: (category: string) => void;
}
const Category: React.FC<ICategoryList> = ({
  category,
  onCategoryPosition,
  categoryName,
  scrollContainer,
  expandedCategories,
  onCategoryToggle,
  isTopLevel = false,
}) => {
  const categoryContainerRef = useRef<HTMLDivElement>(null);
  const isExpanded = expandedCategories[categoryName];
  const theme = useTheme();

  useEffect(() => {
    const calculatePosition = () => {
      const categoryContainer = categoryContainerRef.current;
      const scrollContainerElement = scrollContainer
        ? scrollContainer.current
        : window;
      if (!categoryContainer || !scrollContainerElement) return;

      const categoryRect = categoryContainer.getBoundingClientRect();
      let elementTop = 0;

      if (scrollContainerElement instanceof HTMLElement) {
        const scrollRect = scrollContainerElement.getBoundingClientRect();
        elementTop =
          categoryRect.top - scrollRect.top + scrollContainerElement.scrollTop;
      } else {
        elementTop = categoryRect.top + window.pageYOffset;
      }
      if (onCategoryPosition) {
        onCategoryPosition(categoryName, elementTop);
      }
    };
    calculatePosition();
  }, [categoryName, onCategoryPosition, expandedCategories, scrollContainer]);

  useEffect(() => {
    const handleResize = () => {
      const calculatePosition = () => {
        const categoryContainer = categoryContainerRef.current;
        const scrollContainerElement = scrollContainer
          ? scrollContainer.current
          : window;
        if (!categoryContainer || !scrollContainerElement) return;

        const categoryRect = categoryContainer.getBoundingClientRect();
        let elementTop = 0;

        if (scrollContainerElement instanceof HTMLElement) {
          const scrollRect = scrollContainerElement.getBoundingClientRect();
          elementTop =
            categoryRect.top -
            scrollRect.top +
            scrollContainerElement.scrollTop;
        } else {
          elementTop = categoryRect.top + window.pageYOffset;
        }
        if (onCategoryPosition) {
          onCategoryPosition(categoryName, elementTop);
        }
      };
      calculatePosition();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [categoryName, onCategoryPosition, scrollContainer]);

  const categoryProducts = category.products;
  if (!categoryProducts || categoryProducts.length === 0) {
    return null;
  }

  const categoryToggleHandler = () => {
    onCategoryToggle(categoryName);
  };

  const categoryNameFormatted = categoryName;
  return (
    <Col ref={categoryContainerRef}>
      <Row
        p="0.5rem 1rem"
        a="center"
        j="between"
        onClick={() => categoryToggleHandler()}
        style={{
          cursor: "pointer",
        }}
      >
        <Text tt="cap" s="16" w={6}>
          {categoryNameFormatted}
        </Text>
        <Icon
          name={IconName.DownArrow}
          color={
            isTopLevel
              ? theme.neutralColor.text
              : theme.neutralColor.textSecondary
          }
          style={{
            transform: `rotate(${isExpanded ? "180deg" : "0deg"})`,
            transformOrigin: "center",
            marginTop: `${isExpanded ? "4px" : "0"}`,
            marginBottom: `${isExpanded ? "0" : "4px"}`,
          }}
        />
      </Row>
      {isExpanded && (
        <>
          <Col p="1rem">
            {categoryProducts.map((product, index) => (
              <Row
                key={index}
                p={"1rem 0.5rem"}
                style={{ borderBottom: `1px dotted rgb(225, 225, 229)` }}
              >
                <ItemFoodCard item={{ ...product }} key={product.id} />
              </Row>
            ))}
          </Col>
          {Object.entries(category.subCategories).map(
            ([subCatName, subCategory], index) => (
              <Category
                key={index}
                categoryName={subCatName}
                category={subCategory}
                isTopLevel={false}
                scrollContainer={scrollContainer}
                expandedCategories={expandedCategories}
                onCategoryToggle={onCategoryToggle}
              />
            )
          )}
        </>
      )}
    </Col>
  );
};

export default React.memo(Category);
