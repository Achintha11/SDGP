import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import * as SecureStore from "@react-native-async-storage/async-storage";
import { getAuth, createUserWithEmailAndPassword, getReactNativePersistence } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDoj4dzp-kZ1f0tHJOE9RaqfcKU1-xAork",
  authDomain: "studymatev1.firebaseapp.com",
  projectId: "studymatev1",
  storageBucket: "studymatev1.appspot.com",
  messagingSenderId: "827371602404",
  appId: "1:827371602404:web:3dbc142d893df4a43387f1"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(SecureStore)
});


export default auth;