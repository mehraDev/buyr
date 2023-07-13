import { ISellerProfile } from "app/interfaces";
import { fetchDocument } from "firebaseServices/firestore/document";

async function getProfileById(id: string): Promise<ISellerProfile | null> {
  const PROFILE_LOCATION = `sellers/${id}/private`;
  try {
    const data = await fetchDocument(PROFILE_LOCATION, 'profile');
    
    if (data) {
      const profile: ISellerProfile = {
        firstName: data.firstName,
        lastName: data.lastName || "",
        shopName: data.shopName,
        phone: data.phone || undefined,
        email: data.email,
        shopType: data.shopType,
        address: data.address || "",
        fb: data.fb || "",
        wa: data.wa || "",
        about: data.about || ""
      };
      return profile;
    } 

    return null;
  } catch (error) {
    throw new Error("Failed to get shop type");
  }
}

export default getProfileById;
