 // Import the functions you need from the SDKs you need
 import { initializeApp } from "firebase/app";
 import { getFirestore } from "firebase/firestore";
 import { getStorage } from "firebase/storage";
 import { getAuth } from "firebase/auth"
 import { getDatabase } from "firebase/database";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries
 // Your web app's Firebase configuration
 const firebaseConfig = {
    apiKey: "AIzaSyA8yG5u1sBlyZmI4hJmqiR81j5pb5F9Bz4",
    authDomain: "fastfooddelivery-646b3.firebaseapp.com",
    databaseURL: "https://fastfooddelivery-646b3-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "fastfooddelivery-646b3",
    storageBucket: "fastfooddelivery-646b3.appspot.com",
    messagingSenderId: "156540035401",
    appId: "1:156540035401:web:f243528b418881adb13a98",
    measurementId: "G-WQY72443NV"
 };
 // Initialize Firebase
 
 const app = initializeApp(firebaseConfig);
 // Export firestore database
 // It will be imported into your react app whenever it is needed
 export const db = getFirestore(app);
 export const storage = getStorage(app);
 export const auth = getAuth(app);
 export const database = getDatabase(app);
