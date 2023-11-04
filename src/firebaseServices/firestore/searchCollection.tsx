import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "firebaseServices/firebase";

async function searchCollection(
  collectionPath: string,
  field: string,
  value: any
) {
  try {
    const collectionRef = collection(db, collectionPath);
    const q = query(collectionRef, where(field, "==", value));
    const querySnapshot = await getDocs(q);
    const documents: any[] = [];

    querySnapshot.forEach((doc) => {
      documents.push(doc);
    });

    return documents;
  } catch (error) {
    console.error("Error querying documents:", error);
    throw new Error("Failed to query documents");
  }
}

export default searchCollection;
