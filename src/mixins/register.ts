import Vue from 'vue'
import Component from 'vue-class-component'
import firebase from "firebase/app";
import CONSTANT from "@/common/constant";
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'

@Component
export default class RegisterMixin extends Vue {
  @Getter('firebaseAuth') firebaseAuth!: any
  @Action('pushError') pushError!: (detail: any) => void

  protected _register_username: string
  protected _register_password: string
  protected _register_repassword: string
  constructor() {
    super()
    this._register_username = "";
    this._register_password = "";
    this._register_repassword = "";
  }

  created() {
    const self = this;
    const currentUser = self.firebaseAuth.currentUser;
    if (currentUser) {
      self.$router.push({ path: '/' });
    }
  }

  register() {
    const self = this;
    self.firebaseAuth.createUserWithEmailAndPassword(self._register_username, self._register_password)
      .then(function (user: firebase.auth.UserCredential) {
        if (!user) {
          self.pushError({ message: "ERR000000002" });
        } else {
          self.$router.push({ path: '/' });
        }
      }).catch(function (error: any) {
        // Handle Errors here.
        var errorCode: string = error.code;
        var errorMessage = error.message;
        self.detectErrorCode(errorCode);
        self.pushError({ message: "error." + errorCode, error: errorMessage, errorCode: errorCode });
      });
  }

  private detectErrorCode(errorCode: string) {
    switch (errorCode) {
      case "auth/email-already-in-use":
        
        break;
    
      default:
        break;
    }
  }
}