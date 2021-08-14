import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyDYa7LLvpzTJOwLwQJ2UhlJ0JJkR_euzb4",
  authDomain: "spiritude-task.firebaseapp.com",
  projectId: "spiritude-task",
  storageBucket: "spiritude-task.appspot.com",
  messagingSenderId: "484127345723",
  appId: "1:484127345723:web:50648f59def0201642201e"
};

  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth()
export const firestore = firebase.firestore()

const googleProvider = new firebase.auth.GoogleAuthProvider()
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider)

export const handleUserProfile = async (userAuth , additionalData) => {
    const { uid } = userAuth
    const userRef = firestore.doc(`users/${uid}`)
    const snapshot = await userRef.get();
    if(!snapshot.exists ){
        const { displayName, email} = userAuth;
        const date = new Date();
         userRef.set({
          displayName,
          email,
          createdDate: date,
          ...additionalData
      })
    }
    return userRef
}