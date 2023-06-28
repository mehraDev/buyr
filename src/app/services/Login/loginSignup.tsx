import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'firebaseServices/firebase';

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('Logged in OK', user);
    return user;
  } catch (error) {
    console.error('Error in Login User ', error);
    throw error;
  }
};
