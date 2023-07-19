import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "firebaseServices/firebase";

async function fetchImageFromStorage(folderPath: string, imageName: string) {
  const imagePath = `${folderPath}/${imageName}`;
  const imageRef = ref(storage, imagePath);

  try {
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    throw error;
  }
}

export async function getUrl(location: string): Promise<string> {
  try {
    const imageRef = ref(storage, location);
    const downloadURL = await getDownloadURL(imageRef);

    return downloadURL;
  } catch (error) {
    console.error("Error getting image URL:", error);
    return "";
  }
}

export default fetchImageFromStorage;
