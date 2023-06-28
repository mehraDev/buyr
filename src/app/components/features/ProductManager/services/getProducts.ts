import { IProduct } from "app/components/features/ProductManager/interfaces/productInterface";

const getProducts = async (): Promise<IProduct[]> => {
    try {
      const response: IProduct[] = [];
      return response;
    } catch (error) {
      const errMsg = 'Failed to fetch products';
      console.log(errMsg)
      throw new Error(errMsg);
    }
  };

export default getProducts;