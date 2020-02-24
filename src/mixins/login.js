import { mapGetters } from 'vuex'
import * as firebase from "firebase/app";

const login = {
  data: function () {
    return {
      username: "",
      password: ""
    }
  },
  created: function() {

  },
  methods: {
    loginByAccount: function () {

    },
    loginByGoogle: function () {
      const self = this;
      var provider = new firebase.auth.GoogleAuthProvider();
      self.firebaseAuth().signInWithRedirect(provider);
    },
    ...mapGetters([
      'firebaseAuth'
    ])
  }
}

export default login;