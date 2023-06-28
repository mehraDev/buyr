import React from "react";
import { IProductFood } from "../../interfaces/productInterface";
import { IViewerFood } from "../../interfaces/viewerInterface";
import ProductCardFood from "./ProductCardFood";

const ViewerFood: React.FC<IViewerFood> = ({ products }) => {

  return (
    <>
      {products.map((foodItem: IProductFood) => (
        <ProductCardFood product={foodItem} key={foodItem.id} />
      ))}
    </>
  );
};

export default ViewerFood;
