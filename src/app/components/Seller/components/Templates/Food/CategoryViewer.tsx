import { IProductFood } from "app/interfaces";
import { useEffect, useState } from "react";

import Category from "./Category";
import React from "react";
import categoriseProducts from "./utils/categoriseProducts";
import { ESortType } from "./FoodMenu";

interface ICategoryviewer {
  products: IProductFood[];
  scrollContainer?: React.RefObject<HTMLDivElement>;
  sort: ESortType | null;
  onActive?: (value: string) => void;
  onCategoryPositionsUpdate: (category: string, postion: number) => void;
}

const CategoryViewer: React.FC<ICategoryviewer> = ({
  scrollContainer,
  products,
  onCategoryPositionsUpdate,
  sort,
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
          isTopLevel={true}
          category={categorisedProducts[category]}
          scrollContainer={scrollContainer}
          key={`${category}`}
          categoryName={`${category}`}
          expandedCategories={expandedCategories}
          onCategoryToggle={handleCategoryToggle}
          onCategoryPosition={onCategoryPositionsUpdate}
        />
      ))}
    </>
  );
};
export default CategoryViewer;
