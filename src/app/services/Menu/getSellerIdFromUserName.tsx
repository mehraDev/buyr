import { queryDocumentsByField } from "firebaseServices/firestore";

async function getSellerIdFromUserName(
  userName: string
): Promise<string | null> {
  try {
    const collectionPath = "sellers";
    const field = "usr";
    const sellers = await queryDocumentsByField(
      collectionPath,
      field,
      userName
    );

    if (sellers.length > 0) {
      console.log("seller ", sellers);
      const sellerId = sellers[0] as string;
      return sellerId;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching seller ID:", error);
    throw new Error("Failed to fetch seller ID");
  }
}

export default getSellerIdFromUserName;
