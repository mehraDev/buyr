import { SELLER_USER_ID_FIELD } from "app/services/constants/Constants";
import searchCollection from "firebaseServices/firestore/searchCollection";

async function getSellerIdByUsername(username: string): Promise<string | null> {
  try {
    const collectionPath = "sellers";
    const sellerDocuments = await searchCollection(collectionPath, SELLER_USER_ID_FIELD, username);

    if (sellerDocuments.length > 0) {
      // Assuming you expect only one result
      const sellerDocument = sellerDocuments[0];
      return sellerDocument.id;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching seller ID by username:", error);
    throw new Error("Failed to fetch seller ID by username");
  }
}

export default getSellerIdByUsername;
