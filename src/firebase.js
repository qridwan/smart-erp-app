import firebase from "firebase/compat/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";

const config = {
  apiKey: "AIzaSyDdyCOlVsHwA6QMkZNb1ISRd-e0roA5_d4",
  authDomain: "paar-dev-e8ad9.firebaseapp.com",
  databaseURL: "https://paar-dev-default-rtdb.firebaseio.com",
  projectId: "paar-dev",
  storageBucket: "paar-dev.appspot.com",
  messagingSenderId: "254916440704",
  appId: "1:254916440704:web:4015433a3b9a47f0162c65",
  measurementId: "G-B5JTTC5MLQ",
};
console.log(typeof initializeApp);
const app = firebase.initializeApp(config);
const db = getDatabase(app);
const bucket = getStorage(app);
const fbFunctions = getFunctions(app);
const auth = getAuth();
// const auth = app.auth();

// export const generateUserDocument = async (user, additionalData) => {
//   if (!user) return;

//   const userRef = firestore.doc(`users/${user.uid}`);
//   const snapshot = await userRef.get();

//   if (!snapshot.exists) {
//     const { email, displayName, photoURL } = user;
//     try {
//       await userRef.set({
//         displayName,
//         email,
//         photoURL,
//         ...additionalData
//       });
//     } catch (error) {
//       console.error("Error creating user document", error);
//     }
//   }
//   return getUserDocument(user.uid);
// };

// const getUserDocument = async uid => {
//   if (!uid) return null;
//   try {
//     const userDocument = await firestore.doc(`users/${uid}`).get();

//     return {
//       uid,
//       ...userDocument.data()
//     };
//   } catch (error) {
//     console.error("Error fetching user", error);
//   }
// };

export { db, bucket, auth, fbFunctions };
