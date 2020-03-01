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
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      self.$router.push({ path: '/' });
    }
  }

  register() {
    const self = this;
    firebase.auth().createUserWithEmailAndPassword(self._register_username, self._register_password)
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
        if (self.detectErrorCode(errorCode)) {
          self.pushError({ message: "error." + errorCode, error: errorMessage, errorCode: errorCode });
        }
      });
  }

  private async detectErrorCode(errorCode: string): Promise<boolean> {
    switch (errorCode) {
      case "auth/email-already-in-use":
        return await this.createUserAutomatic();

      default:
        break;
    }
    return true;
  }

  private async createUserAutomatic(): Promise<boolean> {
    const self = this;
    const currentUser = firebase.auth().currentUser;
    if (currentUser && currentUser.providerId !== firebase.auth.EmailAuthProvider.PROVIDER_ID) {
      var credential = firebase.auth.EmailAuthProvider
        .credential(this._register_username, this._register_password);
      return await currentUser.linkWithCredential(credential).then((onfulfilled) => {
        if(onfulfilled.user) {
          self.$router.push({ path: '/' });
          return false;
        } else {
          return true;
        }
      }).catch((onrejected) => {
        return true;
      });
    } else {
      return true;
    }
  }
}