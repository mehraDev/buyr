import {collection, doc, writeBatch} from '@firebase/firestore'
import {db} from '../firebase'

async function addMenuItems(sellerId:string, menuItems:any) {
  console.log(`Adding menu items for ${sellerId} , menuItems: `, menuItems)
  const batch = writeBatch(db)

  menuItems.forEach((item:any) => {
    const newItemRef = doc(collection(db, `sellers/${sellerId}/menu`))
    batch.set(newItemRef, item)
  })

  await batch.commit()

  console.log(`${menuItems.length} menu items added to seller ${sellerId}'s menu`)
}

export default addMenuItems
