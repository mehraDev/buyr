import { useState, useEffect } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "firebaseServices/firebase";
// import { useAuthModal } from "app/contexts/useAuthModal";

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentUserLoading, setCurrentUserLoading] = useState(true);
  // const { showAuthModal } = useAuthModal();
  const requireAuth = (action: () => void) => {
    if (currentUserLoading) {
      return;
    }

    if (!currentUser) {
      // showAuthModal();
    } else {
      action();
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setCurrentUserLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { currentUser, currentUserLoading, requireAuth };
};
