export enum FeaturesEnum {
  Home = "Home",
  Billing = "Billing",
  Orders = "Orders",
  Statistics = "Statistics",
  Delivery = "Delivery",
  Inventory = "Inventory",
  Transactions = "Transactions",
  Products = "Products",
  ImagePoolManagerAdmin = 'ImagePoolManagerAdmin'
}

const getFeaturesFromShopType =(shopType:string | 0): FeaturesEnum[] => {
  switch (shopType) {
    case 'food':
      return [
        FeaturesEnum.Home,
        FeaturesEnum.Orders,
        FeaturesEnum.Delivery,
        FeaturesEnum.Billing,
        FeaturesEnum.Transactions,
        FeaturesEnum.Statistics,
        FeaturesEnum.Products,
        FeaturesEnum.ImagePoolManagerAdmin
      ];

    case 'clothing':
      return [
        FeaturesEnum.Home,
        FeaturesEnum.Billing,
        FeaturesEnum.Orders,
        FeaturesEnum.Statistics,
        FeaturesEnum.Inventory
      ];
    default:
      return [];
  }
};

export default getFeaturesFromShopType;
