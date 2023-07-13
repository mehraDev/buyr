import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "firebaseServices/firebase";

async function queryDocumentsByField(
  collectionPath: string,
  field: string,
  value: any
): Promise<string[]> {
  try {
    const collectionRef = collection(db, "sellers");
    const q = query(collectionRef, where(field, "==", value));
    console.log("query", collectionPath, field, value);
    const querySnapshot = await getDocs(q);
    const documentIds: string[] = [];

    querySnapshot.forEach((doc) => {
      documentIds.push(doc.id);
    });
    console.log("documentIds ", documentIds);
    return documentIds;
  } catch (error) {
    console.error("Error querying documents:", error);
    throw new Error("Failed to query documents");
  }
}

export default queryDocumentsByField;
