import { onAuthStateChanged } from "firebaseServices/auth";
import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
  ReactNode,
} from "react";

interface AuthContextState {
  isAuthenticated: boolean;
  showAuthModal: boolean;
  checkAuthAndShowModal: () => void;
  printAuthStatus: () => void;
  closeAuthModal: () => void;
  checkAuthOnInitialRender: () => void;
}

const AuthContext = createContext<AuthContextState>({
  isAuthenticated: false,
  showAuthModal: false,
  checkAuthAndShowModal: () => {},
  printAuthStatus: () => {},
  closeAuthModal: () => {},
  checkAuthOnInitialRender: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const checkAuthOnInitialRender = useCallback(() => {}, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    checkAuthOnInitialRender();
  }, [checkAuthOnInitialRender]);

  const checkAuthAndShowModal = useCallback(() => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    }
  }, [isAuthenticated]);

  const closeAuthModal = useCallback(() => {
    setShowAuthModal(false);
  }, []);

  const printAuthStatus = useCallback(() => {
    console.log(`Is Authenticated: ${isAuthenticated}`);
  }, [isAuthenticated]);

  const contextValue = {
    isAuthenticated,
    showAuthModal,
    checkAuthAndShowModal,
    printAuthStatus,
    closeAuthModal,
    checkAuthOnInitialRender,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
