import {doc, collection, setDoc} from 'firebase/firestore'
import {db} from '../firebase'

const addRegistrationDetailsToSeller = async (sellerId: string) => {
  const registrationDetails = {
    shopName: 'Panj Tara',
    shopLocation: '123 M, Near Jhuthra Dharamshala surkhab chownk ',
    shopOwnerName: 'Rahul saini',
    shopOwnerEmail: 'johndoe@example.com',
    shopOwnerPhone: '+1-555-555-5555',
    shopTypeText: 'Retail Store',
    shopType: 'food',
    businessRegistrationNumber: '123456789',
    city: 'Anytown',
    state: 'AnyState',
    zipCode: '12345',
    pinCode: '678901',
    registrationDate: new Date(),
  }
  try {
    const registrationDetailsRef = doc(
      collection(db, 'sellers', sellerId, 'registrationDetails'),
      'details',
    )
    await setDoc(registrationDetailsRef, registrationDetails)
    console.log('Registration details added to seller document')
  } catch (error) {
    console.error('Error adding registration details to seller:', error)
  }
}

export default addRegistrationDetailsToSeller
