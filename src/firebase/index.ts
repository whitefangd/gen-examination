// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import Vue from 'vue'
import * as firebase from "firebase/app";
import firebaseConfig from "@/setting/firebase.json";
import { firestorePlugin } from 'vuefire'

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
require('firebase')

Vue.use(firestorePlugin)

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.functions().useFunctionsEmulator("/api")

export default firebase;

// Get a Firestore instance
export const db = firebase
    .firestore()

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint, Blob } = firebase.firestore
export { Timestamp, GeoPoint, Blob }
