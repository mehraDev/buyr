import {collection, addDoc, doc, getDoc, setDoc} from 'firebase/firestore'
import {db, auth} from '../firebase'
import addRegistrationDetailsToSeller from '../Registration/addRegistrationDetailsToSeller'
import addLicenseDetailsToSeller from '../Registration/addLicense'
// Function to store menu for seller ID
const loadMenu = async (sellerId: string, menuData: any) => {
  // Get reference to seller's menu collection
  console.log('seller id is ', sellerId)
  const menuRef = collection(db, 'sellers', sellerId, 'menu')

  try {
    // Add menu data to Firestore
    await addDoc(menuRef, menuData)
    console.log('Menu stored successfully!')
  } catch (error) {
    console.error('Error storing menu:', error)
  }
}

// const createSellerIfNotExists = async (authId: string): Promise<string> => {
//     console.log('creating seller ', authId);
//     // Check if seller document already exists for this authId
//     const sellerDoc = doc(db, 'sellers', authId);
//     const sellerSnap = await getDoc(sellerDoc);
//     if (sellerSnap.exists()) {
//       // Seller document already exists, return its ID
//       console.log("seller snap ",sellerSnap)
//       return sellerSnap.id;
//     } else {
//         console.log("created ",sellerSnap)
//     // Seller document does not exist, create it with a new ID
//     const newSellerRef = doc(collection(db, 'sellers'));
//     await setDoc(newSellerRef, { authId });
//     return newSellerRef.id;
// }

//   };

const loadMenuFromCurrentSeller = async (menuData: any) => {
  try {
    const currentUser = auth.currentUser
    if (!currentUser) {
      throw new Error('User not authenticated')
    }

    const sellerId = currentUser.uid

    await addRegistrationDetailsToSeller(sellerId)
  } catch (error) {
    console.error('Error storing menu:', error)
  }
}

export {loadMenuFromCurrentSeller}
