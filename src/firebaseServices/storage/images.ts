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
export default fetchImageFromStorage;

