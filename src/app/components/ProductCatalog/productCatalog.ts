import { ISellerProfile } from "app/interfaces";
import { lazy } from "react";

export interface IStaticShop {
  [key: string]: React.LazyExoticComponent<React.FC<{ profile: ISellerProfile, id:string }>>;
}

const productCatalog: IStaticShop = {
  food: lazy(() => import("./Variants/VariantFood/FoodCatalog")),
};

export default productCatalog;
