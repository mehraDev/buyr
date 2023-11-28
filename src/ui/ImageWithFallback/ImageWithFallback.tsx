import { useState } from "react";
import { Img } from "ui/basic";

interface IImageWithFallback {
  src: string;
  fallbackImage?: string;
  alt: string;
  w?: string;
  h?: string;
  br?: string;
  shadow?: string;
}
const ImageWithFallback: React.FC<IImageWithFallback> = ({
  src,
  fallbackImage,
  alt,
  w = "9rem",
  h = "9rem",
  br = "10px",
  shadow = true,
}) => {
  const [isProfileImgError, setIsProfileImgError] = useState(false);
  const imageUrl = isProfileImgError ? fallbackImage : src;
  const handleImageError = () => {
    setIsProfileImgError(true);
  };

  return (
    <Img
      style={{ boxShadow: shadow ? "0 1px 6px 0 #a5929747" : "" }}
      src={imageUrl}
      alt={alt}
      w={w}
      h={h}
      br={br}
      onError={handleImageError}
    />
  );
};

export default ImageWithFallback;
