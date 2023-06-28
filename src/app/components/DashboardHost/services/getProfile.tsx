
import { fetchDocument } from "firebaseServices/firestore/document";
import { getUserID } from "./getUserID";
import { IProfile } from "app/components/Signup/services";

async function getProfile(): Promise<IProfile | 0> {
  const userId = getUserID();
  const PROFILE_LOCATION = `sellers/${userId}/private`;
  try {
    const data = await fetchDocument(PROFILE_LOCATION, 'profile');
    
    if (data) {
      const profile: IProfile = {
        firstName: data.firstName,
        lastName: data.lastName,
        shopName: data.shopName,
        phone: data.phone,
        shopType: data.shopType,
        email: data.email
      };
      return profile;
    } 

    return 0;
  } catch (error) {
    throw new Error("Failed to get shop type");
  }
}

export default getProfile;

