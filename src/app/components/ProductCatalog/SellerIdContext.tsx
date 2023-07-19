import React, { createContext, useContext } from "react";

// Create a context with an initial value of an empty string (you can set the initial value based on your requirements)
const SellerIdContext = createContext<string>("");

// Create a custom hook to access the seller ID value from the context
export const useSellerId = () => useContext(SellerIdContext);

// Create a provider component to wrap the root of your application and provide the seller ID value
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
