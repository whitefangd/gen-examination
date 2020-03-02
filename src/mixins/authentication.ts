import Vue from 'vue'
import Component from 'vue-class-component'
import { mapGetters, mapActions } from 'vuex'
import firebase from "@/firebase";
import CONSTANT from "@/common/constant";
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'

@Component({
  beforeRouteEnter
})
export default class AuthenticationMixin extends Vue {


  
}

function beforeRouteEnter(to: any, from: any, next: any) {
  console.log([from, to]);
  const access = firebase.functions().httpsCallable("Authentication-access");
  access({ path: to.path, action: "ACCESS" }).then(function() {
    next();
  }).catch(function (error) {
    if (passPath(to.path)) {
      if(from.name) {
        next(false);
      } else {
        next({ path: '/'});
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