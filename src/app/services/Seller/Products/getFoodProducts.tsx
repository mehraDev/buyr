import { fetchDocument } from "firebaseServices/firestore";
import { IProductFood } from "app/interfaces";
import { getSellerPrivateCollection } from "app/services/constants/SellerConstants";
import { DocumentFields } from "firebaseServices/firestore/Document/interfaces";
import { SELLER_PRODUCTS_FILE, SELLER_PRODUCTS_FOOD_LIST } from "./constants";
import { resolveRelativeImageUrls } from "app/services/MenuHost/productImages";
import { EShop } from "app/enums/MenuHost";

const getProductsFoodByID = async (id: string): Promise<IProductFood[]> => {
  try {
    if (id === null) {
      throw new Error("Invalid Id.");
    }
    const sellerProductsFolder = getSellerPrivateCollection(id);
    const productsDocument = await fetchDocument(
      sellerProductsFolder,
      SELLER_PRODUCTS_FILE
    );
    const relativeImageProducts = documentToFoodProducts(productsDocument);
    const absoluteImageProducst = resolveRelativeImageUrls(
      id,
      relativeImageProducts,
      EShop.Food
    );
    return absoluteImageProducst;
  } catch (error) {
    throw error;
  }
};

export function documentToFoodProducts(
  document: DocumentFields | undefined
): IProductFood[] {
  if (
    !document ||
    !document[SELLER_PRODUCTS_FOOD_LIST] ||
    !Array.isArray(document[SELLER_PRODUCTS_FOOD_LIST])
  ) {
    throw new Error("Invalid document");
  }
  return document[SELLER_PRODUCTS_FOOD_LIST];
}

export default getProductsFoodByID;
