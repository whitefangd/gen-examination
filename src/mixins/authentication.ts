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
export default class AuthenticationMixin extends Vue {
  beforeCreate() {
    const self = this;
    const access = firebase.functions().httpsCallable("Authentication-access");
    access({ path: self.$route.path, action: "ACCESS" }).catch(function (error) {
      if (self.passPath(self.$route.path)) {
        self.$router.push({ path: '/' });
      } else {
        self.$router.push({ path: '/error/' + error.code });
      }
    });
  }

  passPath(path: string): boolean {
    switch (path) {
      case "/login":
      case "/register":
        return true;
      default:
        return false;
    }
  }
}
