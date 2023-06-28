import { openDB, DBSchema } from 'idb';
import { IProduct } from 'app/components/features/ProductManager/interfaces/productInterface';

const DB_NAME = 'my-database';
const OBJECT_STORE_NAME = 'product-catalogue';

interface MyDB extends DBSchema {
  [OBJECT_STORE_NAME]: {
    key: number;
    value: IProduct;
  };
}

const checkProductsInDB = async (): Promise<IProduct[] | null> => {
  const db = await openDB<MyDB>(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'key' });
    },
  });

  const transaction = db.transaction(OBJECT_STORE_NAME, 'readonly');
  const objectStore = transaction.objectStore(OBJECT_STORE_NAME);

  const storedData: IProduct[] = await objectStore.getAll().then((data) => data.map((item) => item));

  if (storedData && storedData.length > 0) {
    return storedData;
  }

  return null;
};

export default checkProductsInDB;
