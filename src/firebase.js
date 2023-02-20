// Import the functions you need from the SDKs you need
import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyB4-VXewJdfrAFToFACVSPvQ7nBWMFT9Cw",
  authDomain: "vit-shop.firebaseapp.com",
  projectId: "vit-shop",
  storageBucket: "vit-shop.appspot.com",
  messagingSenderId: "1083362229702",
  appId: "1:1083362229702:web:94f990b80fa8c702f486c7",
  measurementId: "G-SVF4PQDY13"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage= firebaseApp.storage();
export { db, auth };
export default storage;

