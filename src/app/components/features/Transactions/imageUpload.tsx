import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "firebaseServices/firebase";

interface Props {
  onSubmit: (imageName: string, imageUrl: string) => void;
}

const ImageUploadForm: React.FC<Props> = ({ onSubmit }) => {
  const [imageName, setImageName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageName(e.target.value);
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!imageFile || !imageName) {
      return;
    }
  
    setIsUploading(true);
  
    console.log("Creating storage ref...");
    const storageRef = ref(storage);
    console.log("storageRef:", storageRef);
  
    const uniqueIdentifier = Date.now().toString();
    const imageRef = ref(storageRef, `s/food/p/${imageName}-${uniqueIdentifier}`);
  
    console.log("Uploading image...");
    const snapshot = await uploadBytes(imageRef, imageFile);
    console.log("Image uploaded:", snapshot);
  
    const downloadUrl = await getDownloadURL(snapshot.ref);
  
    console.log("Download URL:", downloadUrl);
    onSubmit(`${imageName}-${uniqueIdentifier}`, downloadUrl);
    setIsUploading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="image-name">Image Name</label>
        <input
          type="text"
          id="image-name"
          value={imageName}
          onChange={handleImageNameChange}
        />
      </div>
      <div>
        <label htmlFor="image-file">Image File</label>
        <input type="file" id="image-file" onChange={handleImageFileChange} />
      </div>
      <button type="submit" disabled={isUploading}>
        {isUploading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
};

export default ImageUploadForm;
