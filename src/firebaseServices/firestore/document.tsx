import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from 'firebaseServices/firebase';

async function createDocument(location: string, documentId: string,data?: any): Promise<void> {
  try {
    const documentRef = doc(db, location, documentId);
    const documentData = data || {};
    await setDoc(documentRef, documentData);
    console.log(`Document created successfully at: ${location} ${documentId}` );
  } catch (error: any) {
    console.error('Error creating document:', error);
    throw new Error('Failed to create document');
  }
}

interface DocumentFields {
  [fieldName: string]: any;
}

async function fetchDocument(location: string, documentId: string, fields?: string[]) : Promise<DocumentFields | undefined>{
  try {
    const docRef = doc(db, location, documentId);
    const documentSnapshot = await getDoc(docRef);

    if (documentSnapshot.exists()) {
      const documentData = documentSnapshot.data();

      if (fields && fields.length > 0) {
        const filteredData: DocumentFields = {};
        for (const field of fields) {
          if (documentData.hasOwnProperty(field)) {
            filteredData[field] = documentData[field];
          }
        }
        console.log("Filtered Document Data:", filteredData);
        return filteredData;
      } else {
        return documentData as DocumentFields;
      }
    } else {
      console.log("Document does not exist:", documentId);
    }
  } catch(error) {
    console.error("Error fetching document:", error);
    throw new Error("Failed to fetch document");
  }
}


export {fetchDocument,createDocument}