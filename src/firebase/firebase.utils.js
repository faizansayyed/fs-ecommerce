import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBzOxWkkCHVvSq9StBo4ug2EoIqaU0ICVg",
  authDomain: "fsecommerce-db.firebaseapp.com",
  databaseURL: "https://fsecommerce-db-default-rtdb.firebaseio.com",
  projectId: "fsecommerce-db",
  storageBucket: "fsecommerce-db.appspot.com",
  messagingSenderId: "337413854783",
  appId: "1:337413854783:web:7e0824b75dc8062dbb0a8a",
  measurementId: "G-C8DYXBR6SQ"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
