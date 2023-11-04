import { getUrl } from "firebaseServices/storage";
import { getPath } from "./getPath";

async function getImageURL(imageName: string, shopType: string, sellerId: string): Promise<string> {
  try {
    if (!imageName) {
      return "";
    }

    const relativeLocation = getPath(imageName, sellerId);
    const absoluteLocation = `s/${shopType}/${relativeLocation}`;

    const downloadURL = await getUrl(absoluteLocation);

    return downloadURL;
  } catch (error) {
    console.error("Error getting image URL:", error);
    return "";
  }
}

export default getImageURL;
