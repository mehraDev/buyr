import { IProduct } from 'app/components/features/ProductManager/interfaces/productInterface';
import { openDB } from 'idb';
const DB_NAME = 'myAppDB';
const STORE_NAME = 'products';

const saveProductsDB = async (products: IProduct[]) => {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(STORE_NAME, { keyPath: 'id' });
    },
  });
  console.log('inside save product', products)
  await db.clear(STORE_NAME); // Clear the existing data in the store

  for (const product of products) {
    await db.put(STORE_NAME, product); // Add each product to the store
  }
  console.log('saved succesfully')
};

export default saveProductsDB;