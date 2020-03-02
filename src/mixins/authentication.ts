import Vue from 'vue'
import Component from 'vue-class-component'
import * as firebase from "firebase/app";

@Component({
  beforeRouteEnter
})
export default class AuthenticationMixin extends Vue {
  
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