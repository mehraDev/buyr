export interface ISellerContacts {
  ph: IContactItem[];
  fb: IContactItem[];
  wa: IContactItem[];
  insta: IContactItem[];
}
export interface IContactItem {
  name: string;
  value: string;
}
