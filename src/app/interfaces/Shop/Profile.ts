import { IconName } from "ui/Icon";

export interface ISellerProfile {
  firstName: string;
  lastName?: string;
  shopName: string;
  phone?: IContactItem[];
  email?: string;
  shopType: string;
  address?: string;
  fb?: IContactItem[];
  wa?: IContactItem[];
  about: string;
  insta?: IContactItem[];
}
export interface IContactItem {
  name: string;
  value: string;
}
