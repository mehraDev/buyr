import { collection, addDoc } from 'firebase/firestore';
import { db } from 'firebaseServices/firebase';

async function createCollection(location: string, collectionId: string): Promise<void> {
  try {
    const collectionRef = collection(db, location, collectionId);
    await addDoc(collectionRef, {});
  } catch (error) {
    console.log(error,'seller creattion')
    throw new Error('Failed to create collection');
  }
}

export default createCollection;
