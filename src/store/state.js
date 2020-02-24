import firebase from "@/firebase";
import { firebaseAuth } from "@/firebase";

const getters = {
  firebase: firebase,
  firebaseAuth: firebaseAuth,
  googleToken: "",
  alertMessage: []
};
export default getters;