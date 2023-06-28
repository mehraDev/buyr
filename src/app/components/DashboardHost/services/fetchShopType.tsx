
import { fetchDocument } from "firebaseServices/firestore/document";
import { getUserID } from "./getUserID";

async function fetchShopType(): Promise<string | 0> {
  try {
    const userId = getUserID();
    const location = `sellers/${userId}/private`;
    const documentData = await fetchDocument(location, 'profile');

    if (documentData && documentData.shopType) {
      const shopType = documentData.shopType;
      return shopType;
    } else {
        console.log("Shop Type does not exist for", userId);
        return 0;
    }
  } catch (error) {
    throw new Error("Failed to retrieve shop type");
  }
}

export default fetchShopType;

