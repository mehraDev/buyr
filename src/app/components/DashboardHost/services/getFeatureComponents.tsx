import getComponentsFromFeatures, { Feature } from "./getComponentsFromFeatures";
import getFeaturesFromShopType, { FeaturesEnum } from "./getFeaturesFromShopType";
import getProfile from "./getProfile";

const getFeatures = async (): Promise<FeaturesEnum[]> => {
  const profile = await getProfile();
  if(profile && profile.shopType){
    const features = getFeaturesFromShopType(profile.shopType);
    return features;
  }
  return [];
};

const getFeatureComponents = async (): Promise<Feature[]>=> {
  try {
        const features: FeaturesEnum[] = await getFeatures();
        const components = getComponentsFromFeatures(features);
        return components;
      } catch (error) {
        throw new Error("Failed to get feature components");
      }
};

export default getFeatureComponents;