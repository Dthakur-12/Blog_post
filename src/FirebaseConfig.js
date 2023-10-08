// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAk8oTahMpa7LGHAIy1M_NRFkKZ492Vu2A",
  authDomain: "blogpost-fe231.firebaseapp.com",
  projectId: "blogpost-fe231",
  storageBucket: "blogpost-fe231.appspot.com",
  messagingSenderId: "124236860525",
  appId: "1:124236860525:web:77a73717e6f4d63573c364"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database=getFirestore(app)
const imgDB=getStorage(app)
const txtDB=getFirestore(app)
export {imgDB,txtDB,database};