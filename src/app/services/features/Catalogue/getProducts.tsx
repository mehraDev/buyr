import { IProduct } from "app/components/features/ProductManager/interfaces/productInterface";


import fetchProducts from "./fetchProducts";
import { auth } from "firebaseServices/firebase";
export const getProducts = async (): Promise<IProduct[]> => {
    try {
      const user = auth.currentUser;
        if (!user) {
          throw new Error('User is not authenticated');
        }
        
            const response: IProduct[] = await fetchProducts();
            return response;
    } catch (error) {
      throw new Error('Failed to fetch inventory data');
    }
  };
