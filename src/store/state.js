import firebase from "@/firebase";
import { firebaseAuth } from "@/firebase";

const getters = {
  firebase: firebase,
  firebaseAuth: firebaseAuth
};
export default getters;