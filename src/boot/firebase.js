// Import the functions you need from the SDKs you need
import firebase from "firebase/app"

import "firebase/auth"
import "firebase/database"

var firebaseConfig = {
  // YOUR CONFIG HERE
  apiKey: "AIzaSyBxNuNXgo01jbG74kkGjr1vbqOM3Uz9DKw",
  authDomain: "test-1d597.firebaseapp.com",
  databaseURL: "https://test-1d597-default-rtdb.firebaseio.com",
  projectId: "test-1d597",
  storageBucket: "test-1d597.appspot.com",
  messagingSenderId: "802862015740",
  appId: "1:802862015740:web:53211e9d17cc1c5d91a379"
}

let firebaseApp = firebase.initializeApp(firebaseConfig)
let firebaseAuth = firebaseApp.auth()
let firebaseDb = firebaseApp.database()

export { firebaseAuth, firebaseDb }

