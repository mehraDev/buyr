import { useEffect, useState } from "react";
import {  ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "firebaseServices/firebase";
interface Image {
  name: string;
  url: string;
}

const ImageCollectionViewer: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const imagesRef = ref(storage, "s/food/p");
      const imagesList = await listAll(imagesRef);

      const imagePromises = imagesList.items.map(async (imageRef) => {
        const name = imageRef.name;
        const url = await getDownloadURL(imageRef);
        return { name, url };
      });

      const images = await Promise.all(imagePromises);
      setImages(images);
    };

    fetchImages();
  }, []);

  return (
    <div>
      <h2>Image Collection Viewer</h2>
      <div>
        {images.map((image) => (
          <div key={image.name}>
            <img src={image.url} alt={image.name} />
            <div>{image.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCollectionViewer;
