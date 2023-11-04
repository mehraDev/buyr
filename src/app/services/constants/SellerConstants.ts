const getSellerPrivateCollection = (sellerId: string): string => {
  return `sellers/${sellerId}/private`;
};

export { getSellerPrivateCollection };
