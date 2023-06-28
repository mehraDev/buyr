import {collection, doc, setDoc} from 'firebase/firestore'
import {db} from '../firebase'

async function createSellerCollections(sellerId:string) {
  // Create the Seller Info collection
  const sellerInfoRef = doc(collection(db, 'sellers', sellerId, 'sellerInfo'), sellerId)
  await setDoc(sellerInfoRef, {
    shopName: 'My Shop',
    shopType: 'Grocery Store',
    // Add other relevant details here
  })

  // Create the Menu collection
  const menuRef = doc(collection(db, 'sellers', sellerId, 'menu'), 'dummyDoc')
  await setDoc(menuRef, {})

  // Create the License collection
  const licenseRef = doc(collection(db, 'sellers', sellerId, 'license'), 'dummyDoc')
  await setDoc(licenseRef, {})

  // Create the Public Details collection
  const publicDetailsRef = doc(collection(db, 'sellers', sellerId, 'publicDetails'), sellerId)
  await setDoc(publicDetailsRef, {
    shopName: 'My Shop',
    address: '123 Main St',
    phone: '555-555-5555',
    // Add other relevant details here
  })

  // Create the Personal Details collection
  const personalDetailsRef = doc(collection(db, 'sellers', sellerId, 'personalDetails'), sellerId)
  await setDoc(personalDetailsRef, {
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '555-555-5555',
    // Add other relevant details here
  })

  // Create the Orders collection
  const ordersRef = doc(collection(db, 'sellers', sellerId, 'orders'), 'dummyDoc')
  await setDoc(ordersRef, {})

  // Create the Billing collection
  const billingRef = doc(collection(db, 'sellers', sellerId, 'billing'), 'dummyDoc')
  await setDoc(billingRef, {})

  // Create the Settings collection
  const settingsRef = doc(collection(db, 'sellers', sellerId, 'settings'), 'dummyDoc')
  await setDoc(settingsRef, {})

  console.log(`Collections created successfully for seller ID ${sellerId}`)
}

// Call the function to create collections for a seller with ID 'abc123'

// Call the function to create collections for a seller with ID 'abc123'
export default createSellerCollections
