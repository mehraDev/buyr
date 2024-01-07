import { User as FirebaseUser, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";
import { auth, functions } from "firebaseServices/firebase";

type User = FirebaseUser | null;

export interface IFormSignUp {
  password: string;
  email: string;
}
export const onAuthStateChanged = (callback: (user: User) => void) => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    if (user) {
      console.log("User signed in: ", user);
      callback(user);
    } else {
      console.log("User signed out");
      callback(null);
    }
  });

  return unsubscribe;
};

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error) {
    throw error;
  }
};

export async function signupUser(email: string, password: string): Promise<any> {
  const buyerSignupFunction = httpsCallable(functions, "buyerSignup");

  try {
    await buyerSignupFunction({ email, password });
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}

// export const signOut = async (): Promise<void> => {
//   try {
//     await firebase.auth().signOut();
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

// export const signUp = async (email: string, password: string): Promise<firebase.auth.UserCredential> => {
//   try {
//     const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
//     return userCredential;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

// Additional methods like password reset, email verification, etc., can be implemented similarly.
