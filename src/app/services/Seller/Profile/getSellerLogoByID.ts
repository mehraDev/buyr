import { getUrlImageStorage } from "firebaseServices/storage";

const SELLER_APP_ROOT = "s";
const SELLERS_COLLECTION = "sellers";
const LOGO_COLLECTION = "logo";

export enum LogoSizes {
  Small = 48, // Smaller devices, lower resolution
  Medium = 72, // Medium devices, medium resolution
  Large = 96, // Larger devices, high resolution
  ExtraLarge = 128, // Extra large devices, very high resolution
  Ultra = 192, // Ultra devices like high-res tablets, laptops
  PwaDefault = 512, // Standard recommended size for PWAs
}

function getSellerLogoByID(sellerId: string, size: LogoSizes = LogoSizes.Large): string {
  try {
    if (sellerId) {
      const SELLER_LOGO_LOCATION = `${SELLER_APP_ROOT}/${SELLERS_COLLECTION}/${sellerId}/${LOGO_COLLECTION}/logo_${size}.png`;
      const storageUrl = `${getUrlImageStorage(SELLER_LOGO_LOCATION)}?alt=media`;
      return storageUrl;
    } else {
      return "";
    }
  } catch (error) {
    console.error("Error getting seller profile image:", error);
    return "";
  }
}

export { getSellerLogoByID };
