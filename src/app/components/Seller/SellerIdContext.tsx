import React, { createContext, useContext } from "react";

// Create a context with an initial value of an empty string (you can set the initial value based on your requirements)
const SellerIdContext = createContext<string>("");
export const useSellerId = () => useContext(SellerIdContext);
interface SellerIdProviderProps {
  sellerId: string;
  children: React.ReactNode;
}

export const SellerIdProvider: React.FC<SellerIdProviderProps> = ({
  sellerId,
  children,
}) => {
  return (
    <SellerIdContext.Provider value={sellerId}>
      {children}
    </SellerIdContext.Provider>
  );
};
