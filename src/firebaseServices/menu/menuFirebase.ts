import {db, auth} from '../firebase'
import {collection, getDocs, query} from 'firebase/firestore'

async function fetchMenu() {
  const userId = auth.currentUser?.uid
  if (!userId) {
    throw new Error('User is not authenticated')
  }

  // const menuRef = collection(db, 'sellers', userId, 'menu')
  // const querySnapshot = await getDocs(query(menuRef))
  // const menuItems = querySnapshot.docs.map((doc) => doc.data())
  // console.log('Fetched menu success ', menuItems)
  // return menuItems
}

export default fetchMenu
