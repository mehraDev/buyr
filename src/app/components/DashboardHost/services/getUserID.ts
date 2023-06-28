import { auth } from "firebaseServices/firebase";
export const USER_ID = 'userID';

const getUserID = () => {
    if(auth && auth.currentUser){
        return auth.currentUser.uid
    }

    const savedUser = localStorage.getItem(USER_ID);
    if (savedUser) {
        return JSON.parse(savedUser)
    }

    return 0;
}

export {getUserID}