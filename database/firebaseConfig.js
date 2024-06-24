import { initializeApp } from "firebase/app";
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCzuxwo7pgcmFK08P6aJnTIbarnlXQVcC0",
  authDomain: "abasteceaifree.firebaseapp.com",
  projectId: "abasteceaifree",
  storageBucket: "abasteceaifree.appspot.com",
  messagingSenderId: "568385903812",
  appId: "1:568385903812:web:7e9904305b04ae1437bd91",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firestore, storage };
