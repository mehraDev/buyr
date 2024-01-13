import { ISellerContacts } from "app/interfaces/Shop/Contacts";
import { getSellerPrivateCollection } from "app/services/constants/SellerConstants";
import { fetchDocument } from "firebaseServices/firestore/Document/document";

async function getSellerContactsById(userId: string): Promise<ISellerContacts | null> {
  if (!userId) {
    throw new Error("Invalid id"); // Throw an error if userId is missing or falsy
  }

  const CONTACTS_LOCATION = getSellerPrivateCollection(userId);
  try {
    const data = await fetchDocument(CONTACTS_LOCATION, "contacts");
    if (data) {
      const contacts: ISellerContacts = {
        ph: data.ph,
        wa: data.wa,
        insta: data.insta,
        fb: data.fb,
      };
      return contacts;
    }
    return null;
  } catch (error) {
    throw new Error("Failed to get contacts.");
  }
}

export default getSellerContactsById;
