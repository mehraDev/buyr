import { menu } from "app/components/ProductCatalog/Variants/VariantFood/dummyFoodItems";
import { IProduct } from "app/interfaces";
import { fetchDocument } from "firebaseServices/firestore/document";

async function getProducts(id: string): Promise<IProduct[] | undefined> {
  const PRODUCT_LOCATION = `sellers/${id}/private`;
  try {
    const products =  menu;//await fetchDocument(PRODUCT_LOCATION, 'products');
    console.log(products)
    if (products && products) {
      return products as IProduct[];
    } 

    return undefined;
  } catch (error) {
    throw new Error("Failed to get Products");
  }
}

export default getProducts;
