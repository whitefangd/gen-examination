import { mapGetters, mapActions } from 'vuex'
import * as firebase from "firebase/app";

const login = {
  data: function () {
    return {
      username: "",
      password: ""
    }
  },
  computed: {
    ...mapGetters([
      'firebaseAuth'
    ])
  },
  created: function () {
    const self = this;
    const currentUser = self.firebaseAuth.currentUser;
    if (!currentUser) {
      switch (this.$session.get('PROVIDER_ID')) {
        case firebase.auth.GoogleAuthProvider.PROVIDER_ID:
          this.resultLoginByGoogle();
          break;
        default:
          break;
      }
    }
  },
  methods: {
    loginByAccount: function () {
      const self = this;
      const PROVIDER_ID = firebase.auth.EmailAuthProvider.PROVIDER_ID;
      this.$session.set('PROVIDER_ID', PROVIDER_ID);
      self.firebaseAuth.signInWithEmailAndPassword(self.username, self.password)
        .then(function (user) {
          self.$session.remove('PROVIDER_ID');
          if (!user) {
            self.pushError({ message: "ERR000000001" });
          }
        })
        .catch(function (error) {
          self.$session.remove('PROVIDER_ID');
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          self.pushError({ message: errorMessage, errorCode, errorCode });
        });
    },
    loginByGoogle: function () {
      const self = this;
      const PROVIDER_ID = firebase.auth.GoogleAuthProvider.PROVIDER_ID;
      var provider = new firebase.auth.GoogleAuthProvider();
      this.$session.set('PROVIDER_ID', PROVIDER_ID);
      self.firebaseAuth.signInWithRedirect(provider);
    },
    resultLoginByGoogle: function () {
      const self = this;
      self.$session.remove('PROVIDER_ID');
      self.firebaseAuth.getRedirectResult().then(function (result) {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          self.googleToken(token);
        }
        // The signed-in user info.
        var user = result.user;
        if (!user) {
          self.pushError({ message: "ERR000000001" });
        }
      }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        self.pushError({ message: errorMessage, email: email, credential: credential, errorCode, errorCode });
      });
    },
    ...mapActions([
      'googleToken',
      'pushError'
    ])
  }
}

export default login;