import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyB51ias_L-vRXwhYMbmP3b0kb9mCdgqHlk",
  authDomain: "basic-db-6b39d.firebaseapp.com",
  databaseURL: "https://basic-db-6b39d.firebaseio.com",
  projectId: "basic-db-6b39d",
  storageBucket: "basic-db-6b39d.appspot.com",
  messagingSenderId: "905834042538",
  appId: "1:905834042538:web:da7ec77f31f07ab8f3ecd3",
  measurementId: "G-8HCYGPJP4V"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('Error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
