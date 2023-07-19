export const getPath = (imageName: string, sellerId: string): string => {
  if (imageName.endsWith(".pool")) {
    const updatedImageName = imageName.slice(0, -5); // Remove ".pool" from the end of the name
    return `p/${updatedImageName}`;
  } else {
    return `usr/${sellerId}/p/${imageName}`;
  }
};
