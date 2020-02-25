import Vue from 'vue'
import Component from 'vue-class-component'
import { mapGetters, mapActions } from 'vuex'
import * as firebase from "firebase/app";
import CONSTANT from "@/common/constant";
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'

@Component
export default class LoginMixin extends Vue {
  @Getter('firebaseAuth') firebaseAuth!: any
  @Action('googleToken') googleToken!: (token: string) => void
  @Action('pushError') pushError!: (detail: any) => void

  protected _login_username!: string
  protected _login_password!: string

  constructor() {
    super()
    this._login_username = "";
    this._login_password = "";
  }

  data() {
    return {}
  }

  created() {
    const self = this;
    const currentUser = self.firebaseAuth.currentUser;
    if (!currentUser) {
      switch (Vue.prototype.$session.get('PROVIDER_ID')) {
        case firebase.auth.GoogleAuthProvider.PROVIDER_ID:
          this.resultLoginByGoogle();
          break;
        default:
          break;
      }
    } else {
      self.$router.push({ path: '/' });
    }
  }

  loginByAccount() {
    const self = this;
    const PROVIDER_ID = firebase.auth.EmailAuthProvider.PROVIDER_ID;
    Vue.prototype.$session.set(CONSTANT.KEY_PROVIDER_ID, PROVIDER_ID);
    self.firebaseAuth.signInWithEmailAndPassword(self._login_username, self._login_password)
      .then(function (user: any) {
        Vue.prototype.$session.remove('PROVIDER_ID');
        if (!user) {
          self.pushError({ message: "ERR000000001" });
        } else {
          self.$router.push({ path: '/' });
        }
      })
      .catch(function (error: any) {
        Vue.prototype.$session.remove(CONSTANT.KEY_PROVIDER_ID);
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        self.pushError({ message: errorMessage, errorCode: errorCode });
      });
  }
  loginByGoogle() {
    const self = this;
    const PROVIDER_ID = firebase.auth.GoogleAuthProvider.PROVIDER_ID;
    var provider = new firebase.auth.GoogleAuthProvider();
    Vue.prototype.$session.set(CONSTANT.KEY_PROVIDER_ID, PROVIDER_ID);
    self.firebaseAuth.signInWithRedirect(provider);
  }
  resultLoginByGoogle() {
    const self = this;
    Vue.prototype.$session.remove(CONSTANT.KEY_PROVIDER_ID);
    self.firebaseAuth.getRedirectResult().then(function (result: any) {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        self.googleToken(token);
      }
      // The signed-in user info.
      var user = result.user;
      if (!user) {
        self.pushError({ message: "ERR000000001" });
      } else {
        self.$router.push({ path: '/' });
      }
    }).catch(function (error: any) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      self.pushError({ message: errorMessage, email: email, credential: credential, errorCode: errorCode });
    });
  }

}