import { IProductFood } from "app/interfaces";
import { useEffect, useState } from "react";

import Category from "./Category";
import React from "react";
import categoriseProducts from "./utils/categoriseProducts";
import { ESortType } from "./FoodMenu";

interface ICategoryviewer {
  products: IProductFood[];
  ordering?: boolean;
  scrollContainer?: React.RefObject<HTMLDivElement>;
  activeSort: ESortType;
  onActive?: (value: string) => void;
  onCategoryPositionsUpdate: (category: string, postion: number) => void;
}

const CategoryViewer: React.FC<ICategoryviewer> = ({
  scrollContainer,
  products,
  onCategoryPositionsUpdate,
  activeSort,
  ordering,
}) => {
  const categorisedProducts = categoriseProducts(products);
  const [expandedCategories, setExpandedCategories] = useState<{
    [category: string]: boolean;
  }>({});

  useEffect(() => {
    const initialExpandedCategories: { [category: string]: boolean } = {};
    const categorisedProducts = categoriseProducts(products);
    Object.keys(categorisedProducts).forEach((category) => {
      initialExpandedCategories[category] = true;
    });
    setExpandedCategories(initialExpandedCategories);
  }, [products]);

  const handleCategoryToggle = (category: string) => {
    setExpandedCategories((prev) => ({ ...prev, [category]: !prev[category] }));
  };
  return (
    <>
      {Object.keys(categorisedProducts).map((category) => (
        <Category
          activeSort={activeSort}
          isTopLevel={true}
          category={categorisedProducts[category]}
          scrollContainer={scrollContainer}
          key={`${category}`}
          categoryName={`${category}`}
          expandedCategories={expandedCategories}
          onCategoryToggle={handleCategoryToggle}
          onCategoryPosition={onCategoryPositionsUpdate}
          addButton={ordering}
        />
      ))}
    </>
  );
};
export default CategoryViewer;
