import { EShop } from "app/enums";
import { IconsManifest, Manifest, createDefaultManifest } from "./updateManifestFile";
import { LogoSizes, getSellerLogoByID } from "app/services/Seller/Profile/getSellerLogoByID";

const getBaseUrl = (): string => {
  return window.location.origin;
};

const createSellerPWAManifest = (shopType: EShop, shopName: string, userName: string, sellerID: string): Manifest | null => {
  let manifest: Manifest | null;

  switch (shopType) {
    case EShop.Food:
      manifest = createFoodManifest(shopName, userName, sellerID);
      break;
    default:
      manifest = null;
  }

  return manifest;
};
const formatName = (name: string): string => {
  return name
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
const createDefaultSellerManifest = (shortName: string, name: string, icons: IconsManifest[], startUrl: string): Manifest => {
  const formattedName = formatName(name);
  const formattedShortName = formatName(shortName);
  return createDefaultManifest(formattedShortName, formattedName, icons, startUrl);
};

function getFoodSellerIcons(id: string): IconsManifest[] {
  const logoSizesArray = [LogoSizes.Small, LogoSizes.Medium, LogoSizes.Large, LogoSizes.ExtraLarge, LogoSizes.Ultra, LogoSizes.PwaDefault];
  return logoSizesArray.map((size) => {
    const iconUrl = getSellerLogoByID(id, size);
    return {
      src: iconUrl,
      sizes: `${size}x${size}`,
      type: "image/png",
    };
  });
}

function createFoodManifest(shopName: string, userName: string, id: string): Manifest {
  const baseUrl = getBaseUrl();
  const absoluteStartUrl = `${baseUrl}/${userName}`;
  const icons = getFoodSellerIcons(id);

  return createDefaultSellerManifest(shopName, shopName, icons, absoluteStartUrl);
}

export default createSellerPWAManifest;
