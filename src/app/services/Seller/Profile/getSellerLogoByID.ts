import { getUrlImageStorage } from "firebaseServices/storage";

const SELLER_APP_ROOT = "s";
const SELLERS_COLLECTION = "sellers";
const LOGO = "logo";

function getSellerLogoByID(sellerId: string): string {
  try {
    if (sellerId) {
      const SELLER_LOGO_LOCATION = `${SELLER_APP_ROOT}/${SELLERS_COLLECTION}/${sellerId}/${LOGO}`;
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
