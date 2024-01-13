import { Address } from "app/interfaces";
import { FirebaseError } from "firebase/app";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { EFirebaseErrorCode } from "firebaseServices/Error";
import { fetchDocument } from "firebaseServices/firestore";
import { doesDocumentExist } from "firebaseServices/firestore/Document";

// Function to add a new address
// export const addAddress = async (userId: string, address: Address) => {
//   try {
//     await setDoc(doc(db, "buyers", userId, "addresses", "default"), address);
//     console.log("Address added successfully");
//   } catch (error) {
//     console.error("Error adding address: ", error);
//   }
// };

const getAddress = async (userId: string): Promise<Address[] | undefined> => {
  try {
    const location = `buyers/${userId}/addresses`;
    const documentId = "list";

    const exists = await doesDocumentExist(location, documentId);

    if (!exists) {
      console.log("Document does not exist, no addresses to fetch.");
      return undefined;
    }
    const addressList = await fetchDocument(location, documentId);

    if (addressList && addressList.hasOwnProperty("addresses")) {
      return addressList["addresses"] as Address[];
    } else {
      console.log("No addresses found");
    }
  } catch (error) {
    if (error instanceof FirebaseError && error.code === EFirebaseErrorCode.PermissionDenied) {
      console.error("Permission denied error: ", error);
      throw new Error("Permission denied");
    } else {
      console.error("Error fetching addresses: ", error);
      throw new Error("Something went wrong.");
    }
  }
};

// Function to update an existing address
// export const updateAddress = async (userId: string, updatedAddress: Address) => {
//   try {
//     const addressRef = doc(db, "buyers", userId, "addresses", "default");
//     await updateDoc(addressRef, updatedAddress);
//     console.log("Address updated successfully");
//   } catch (error) {
//     console.error("Error updating address: ", error);
//   }
// };

// Export all functions for use in your components
export { getAddress };

// Assuming you're using something like Redux or Context API for global state
// and localStorage for local storage

// const globalState = useGlobalState(); // Custom hook to access global state

// // Function to get the address, preferring local data to minimize fetches
// async function getAddress(userId) {
//   let address = globalState.address;

//   if (!address) {
//     // Try to get the address from local storage
//     const localData = localStorage.getItem(`address_${userId}`);
//     if (localData) {
//       address = JSON.parse(localData);
//     } else {
//       // Fetch from Firestore as a last resort
//       address = await fetchAddressFromFirestore(userId);
//       localStorage.setItem(`address_${userId}`, JSON.stringify(address));
//     }
//     // Update global state
//     updateGlobalState({ address });
//   }

//   return address;
// }

// // Function to update the address
// async function updateAddress(userId, newAddress) {
//   // Update Firestore
//   await updateAddressInFirestore(userId, newAddress);

//   // Update local storage
//   localStorage.setItem(`address_${userId}`, JSON.stringify(newAddress));

//   // Update global state
//   updateGlobalState({ address: newAddress });
// }
