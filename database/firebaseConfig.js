import { initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBdDMWkq0Jy7AS54dkzAFNV7zdQgtnLhg4",
  authDomain: "abasteceai-d8ab4.firebaseapp.com",
  projectId: "abasteceai-d8ab4",
  storageBucket: "abasteceai-d8ab4.appspot.com",
  messagingSenderId: "846068481720",
  appId: "1:846068481720:web:f456eb4a1b11de526ebe4d",
};


const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firestore, storage };