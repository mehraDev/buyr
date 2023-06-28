import { User } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

import { auth, db } from "firebaseServices/firebase";
const ROOT = 'sellers';

async function signupSeller(shopType: string,sellerName: string,sellerPhone: string,sellerEmail: string) {
  try {
    const user = auth.currentUser;
    if (user) {
      const initialFieldsForSeller = {shopType: shopType};
      createDocumentWithUserIDOnROOT(user,ROOT, initialFieldsForSeller);
      console.log("created");
      // const sellerDocRef = doc(db, "sellers", user.uid);
      // const regDetailsCollectionRef = collection(sellerDocRef,'regDetails');
      // await addDoc(regDetailsCollectionRef,  {shopType: shopType,sellerName: sellerName,phone:sellerPhone,mail:sellerEmail } );
      // console.log("Seller account created successfully!");
    } else {
      console.log("User is not logged in during signupSeller");
    }
  } catch (error) {
    console.error("Error creating seller :", error);
    
  }
}

const  createDocumentWithUserIDOnROOT = async (user: User, root = 'sellers', initialFields = {}) =>{
  try {
    const userDocRef = doc(db, root, user.uid);
    await setDoc(userDocRef, initialFields);
  } catch (error) {
    console.error("Error create Document WithUserID On ROOT: ", error);
  }
}
export default signupSeller;