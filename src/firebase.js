import firebase from 'firebase/app'
import "firebase/auth"

const app = firebase.initializeApp({
    apiKey: "AIzaSyBgljwOyKG1uFwOAK_sc5xoXdN8N63Cncw",
    authDomain: "police-entry-suspect.firebaseapp.com",
    projectId: "police-entry-suspect",
    storageBucket: "police-entry-suspect.appspot.com",
    messagingSenderId: "740891291553",
    appId: "1:740891291553:web:e01cf09ba129b68d7fa5e0",
    measurementId: "G-T6DF4CXLLS"
})

export const auth = app.auth()
export default app