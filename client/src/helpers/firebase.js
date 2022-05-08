import firebase from "@firebase/app";
import "@firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAQa1YbFOXAlTZG2n8ZTENZLHI3aAyhol4",
    authDomain: "photoprint-db532.firebaseapp.com",
    projectId: "photoprint-db532",
    storageBucket: "photoprint-db532.appspot.com",
    messagingSenderId: "937877443867",
    appId: "1:937877443867:web:b49b11b7393a94fe9c2fbe",
    measurementId: "G-6Z48ER252Q"
};

firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();