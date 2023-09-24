import { ISellerProfile } from "app/interfaces";
import {
  SELLER_PARENT,
  SELLER_USER_ID_FIELD,
} from "app/services/constants/Constants";
import searchCollection from "firebaseServices/firestore/searchCollection";

async function getSellerDocumentByUsername(
  username: string
): Promise<ISellerProfile | null> {
  try {
    const sellerDocuments = await searchCollection(
      SELLER_PARENT,
      SELLER_USER_ID_FIELD,
      username
    );

    if (sellerDocuments.length > 0) {
      const sellerDocument = sellerDocuments[0];
      const profile = sellerDocument.data() as ISellerProfile;
      return profile;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching seller document:", error);
    throw new Error("Failed to fetch seller document");
  }
}

export default getSellerDocumentByUsername;
