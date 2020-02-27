// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";
import firebaseConfig from "@/setting/firebase.json";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
require('firebase')

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const firebaseAuth = firebase.auth();
firebase.functions().useFunctionsEmulator("/api")

export default firebase;

export { firebaseAuth }