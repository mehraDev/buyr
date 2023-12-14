import { EShop } from "app/enums";

const STORAGE_ROOT_LOCATION = "s";
const STORAGE_SELLER_ROOT_LOCATION = `${STORAGE_ROOT_LOCATION}/sellers`;
const STORAGE_SELLERS_PRODUCTS_IMAGES_LOCATION = `products`;
const STORAGE_POOL_LOCATION = `pool`;
const SELLER_USER_ID_FIELD = "user";

const getLocationSellerProductsImages = (sellerId: string) => {
  return `${STORAGE_SELLER_ROOT_LOCATION}/${sellerId}/${STORAGE_SELLERS_PRODUCTS_IMAGES_LOCATION}/`;
};

const getLocationPoolProductsImages = (shopType: EShop) => {
  return `${STORAGE_ROOT_LOCATION}/${STORAGE_POOL_LOCATION}/${shopType}/`;
};

export { getLocationSellerProductsImages, getLocationPoolProductsImages, SELLER_USER_ID_FIELD };
