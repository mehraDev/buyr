import { EShop } from "app/enums";

export interface ISellerProfile {
  user: string;
  name: string;
  address: string;
  about: string[];
  type: EShop;
  id: string;
}

export interface IContactItem {
  name: string;
  value: string;
}
