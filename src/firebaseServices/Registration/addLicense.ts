import {collection, doc, setDoc} from 'firebase/firestore'
import {db} from '../firebase'

const addLicenseDetailsToSeller = async (sellerId:string, licenseType:string) => {
  try {
    const licenseDocRef = doc(collection(db, 'sellers', sellerId, 'license'), 'licenseDetails')
    await setDoc(licenseDocRef, {
      licenseType: licenseType,
      licenseStartDate: new Date(),
    })
    console.log('License details added to seller document')
  } catch (error) {
    console.error('Error adding license details to seller:', error)
  }
}

export default addLicenseDetailsToSeller
