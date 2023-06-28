import { IProduct } from 'app/components/features/ProductManager/interfaces/productInterface';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from 'firebaseServices/firebase';


const fetchProducts = async (): Promise<IProduct[]> => { // Specify the return type as Promise<Products>
  try {
    const user = auth.currentUser;
        if (!user) {
          throw new Error('User is not authenticated');
        }
    const docRef = doc(db, `sellers/${user.uid}/products`, 'list');
    const docSnapshot = await getDoc(docRef);
        
    if (docSnapshot.exists()) {
      console.log('inside fetch products',`sellers/${user.uid}/products`,docSnapshot);

      const products = docSnapshot.data() as IProduct[]; // Cast the data to the Products type
      return products; // Return the products data
    } else {
      throw new Error('Document does not exist');
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error; // Throw the error to handle it outside the function
  }
};

export default fetchProducts;
