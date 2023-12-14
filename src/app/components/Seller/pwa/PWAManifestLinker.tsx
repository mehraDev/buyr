import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { injectManifest } from "./services/updateManifestFile";
import createSellerPWAManifest from "./services/createSellerPWAManifest";
import { EShop } from "app/enums";

interface PWAManifestLinkerProps {
  shopType: EShop;
  shopName: string;
  userName: string;
  id: string;
}

const PWAManifestLinker: React.FC<PWAManifestLinkerProps> = ({
  shopType,
  shopName,
  id,
  userName,
}) => {
  useEffect(() => {
    const manifest = createSellerPWAManifest(shopType, shopName, userName, id);

    injectManifest(manifest);
  }, [id, shopName, shopType, userName]);

  if (!shopName) {
    return null;
  }

  return <Helmet>{/* <link rel="manifest" href={manifestUrl} /> */}</Helmet>;
};

export default PWAManifestLinker;
