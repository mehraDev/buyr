import { ISellerProfile } from "app/interfaces";
import { lazy } from "react";

export interface ISellerComponentMap {
  [key: string]: React.LazyExoticComponent<React.FC<{ profile: ISellerProfile }>>;
}

const sellerComponentDirectory: ISellerComponentMap = {
  food: lazy(() => import("./components/Templates/Food/ShopTemplateFood")),
  // ... other seller type components
};

export function getSellerComponent(shopType: string) {
  return sellerComponentDirectory[shopType];
}
