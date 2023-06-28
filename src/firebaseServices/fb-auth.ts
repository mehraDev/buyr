import {getFirestore, doc, setDoc, serverTimestamp} from 'firebase/firestore'
import {auth} from './firebase'

const addRoleToUser = async (role: string) => {
  const user = auth.currentUser

  if (user) {
    try {
      const userRef = doc(getFirestore(), 'users', user.uid)
      await setDoc(
        userRef,
        {
          role: role,
          lastUpdated: serverTimestamp(),
        },
        {merge: true},
      )
      console.log('User role added successfully!')
    } catch (error) {
      console.error(error)
    }
  }
}

export {addRoleToUser}
