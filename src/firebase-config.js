// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyDD-hDCvVrdqY-mhssw8MIUE7K-WvqEVAY",

  authDomain: "attendance-85432.firebaseapp.com",

  databaseURL: "https://attendance-85432-default-rtdb.firebaseio.com",

  projectId: "attendance-85432",

  storageBucket: "attendance-85432.appspot.com",

  messagingSenderId: "158360702878",

  appId: "1:158360702878:web:1d6dcecea36bcdf702908f"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getDatabase(app)

const auth = getAuth();

const storage = getStorage(app)

export {
    app,
    db,
    auth,
    storage
}