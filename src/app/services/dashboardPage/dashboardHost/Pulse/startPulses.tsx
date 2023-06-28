import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from 'firebaseServices/firebase';

const checkUserStatusAndSendData = async () => {
  const user = auth.currentUser;
  if (!user) {
    console.log('User is not logged in',user);
    return;
  }

  const connected = window.navigator.onLine;
  if (!connected) {
    console.log('User is not connected to the network');
    return;
  }

  try {
    const userRef = doc(db, 'sellers', user.uid);

    const dataToUpdate = {
      pulse: new Date().toISOString(),
    };
    
    await updateDoc(userRef, dataToUpdate);
    console.log('Pulse sent to Firestore successfully');
  } catch (error) {
    console.log('Error updating pulse in Firestore:', error);
  }
};

const startPulses = () => {
  checkUserStatusAndSendData();

  const intervalId = setInterval(() => {
    checkUserStatusAndSendData();
  }, 5 * 60 *  1000);

  const stopPulses = () => {
    clearInterval(intervalId);
    console.log('Pulse intervals stopped');
  };

  return stopPulses;
};

export default startPulses;