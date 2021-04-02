import firebase from "firebase";


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAS0EfRnqmmH5xCF4QsKABgBYulXUVkaTg",
    authDomain: "instacool-4429f.firebaseapp.com",
    projectId: "instacool-4429f",
    storageBucket: "instacool-4429f.appspot.com",
    messagingSenderId: "643349236261",
    appId: "1:643349236261:web:28c243a09a39b6b7134dcc",
    measurementId: "G-J8B3M6FNDM"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();


export {db, auth, storage};