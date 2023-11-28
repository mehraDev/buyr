import React, { ReactNode, createContext, useContext, useState } from "react";

export const AuthModalContext = createContext({
  isAuthModalOpen: false,
  showAuthModal: () => {},
  hideAuthModal: () => {},
});

interface AuthModalProviderProps {
  children: ReactNode;
}

export const AuthModalProvider: React.FC<AuthModalProviderProps> = ({
  children,
}) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const showAuthModal = () => setIsAuthModalOpen(true);
  const hideAuthModal = () => setIsAuthModalOpen(false);

  return (
    <AuthModalContext.Provider
      value={{ isAuthModalOpen, showAuthModal, hideAuthModal }}
    >
      {children}
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = () => useContext(AuthModalContext);
