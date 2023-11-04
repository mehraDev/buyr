import { IProduct } from "app/interfaces";
import { getUrlImageStorage } from "firebaseServices/storage";
import { getLocationPoolProductsImages, getLocationSellerProductsImages } from "../constants/MenuHost";
import { EImageSource, EShop } from "app/enums/MenuHost";

const getPersonalImageURL = (productName: string, sellerID: string): string => {
  const absoluteLocation = getLocationSellerProductsImages(sellerID) + productName;
  const imageUrl = `${getUrlImageStorage(absoluteLocation)}?alt=media`;
  return imageUrl;
};

const getImageUrlForProduct = (image: string, seller: string, shop: EShop): string => {
  const imageSource: EImageSource = determineImageSource(image);
  if (imageSource === EImageSource.POOL) {
    return getPoolImageURL(image, shop);
  } else {
    return getPersonalImageURL(image, seller);
  }
};

const determineImageSource = (imageName: string): EImageSource => {
  if (imageName.endsWith("_p")) {
    return EImageSource.POOL;
  } else {
    return EImageSource.PERSONAL;
  }
};

const getPoolImageURL = (image: string, shop: EShop): string => {
  const absoluteLocation = getLocationPoolProductsImages(shop) + image;
  const imageUrl = `${getUrlImageStorage(absoluteLocation)}?alt=media`;
  return imageUrl;
};

function resolveRelativeImageUrls(sellerID: string, products: IProduct[], shop: EShop): IProduct[] {
  const productsWithImageUrls: IProduct[] = [];

  for (const product of products) {
    if (product.image) {
      const imageUrl = getImageUrlForProduct(product.image, sellerID ? sellerID : "", shop);
      const productWithImageUrl: IProduct = {
        ...product,
        image: imageUrl,
      };
      productsWithImageUrls.push(productWithImageUrl);
    } else {
      productsWithImageUrls.push(product);
    }
  }

  return productsWithImageUrls;
}

export { getImageUrlForProduct, resolveRelativeImageUrls, determineImageSource };
