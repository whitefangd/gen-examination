import Vue from 'vue'
import { Component } from "vue-property-decorator";
import * as firebase from "firebase/app";
import { Action } from 'vuex-class';

@Component({
  
})
export default class AuthenticationMixin extends Vue {
  @Action('cleanAlertMessage') cleanAlertMessage!: () => void
  mounted() {
    if(this.cleanAlertMessage) {
      this.cleanAlertMessage();
    }
  }
}

function beforeRouteEnter(to: any, from: any, next: any) {
  const access = firebase.functions().httpsCallable("Authentication-access");
  access({ path: to.path, action: "ACCESS" }).then(function () {
    next();
  }).catch(function (error) {
    if (passPath(to.path)) {
      if (from.name) {
        next(false);
      } else {
        next({ path: '/' });
      }
    } else {
      next({ path: '/error/' + error.code });
    }
  });
}

function passPath(path: string): boolean {
  switch (path) {
    case "/login":
    case "/register":
      return true;
    default:
      return false;
  }
}