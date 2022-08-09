import firebase from "firebase/compat"
import "firebase/auth"
import {getFirestore} from "firebase/firestore"

export const app = firebase.initializeApp({
    "projectId": "superheroes-app-ccfe0",
    "appId": "1:842985899841:web:0d88c34afde2340ddb83c0",
    "storageBucket": "superheroes-app-ccfe0.appspot.com",
    "locationId": "us-central",
    "apiKey": "AIzaSyBxY45jApiouGiTHA6qjLU_-ZWlG6j-vnU",
    "authDomain": "superheroes-app-ccfe0.firebaseapp.com",
    "messagingSenderId": "842985899841"
})

export const db = app.firestore()