import { IProduct } from "app/components/features/ProductManager/interfaces/productInterface";
import panjTaraData from "./dummyDAta";

export const getProductCatalogueList = async (): Promise<IProduct[]> => {
    try {
      const response: IProduct[] = panjTaraData;
      return response;
    } catch (error) {
      const errMsg = 'Failed to fetch products';
      console.log(errMsg)
      throw new Error(errMsg);
    }
  };