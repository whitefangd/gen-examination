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
    const access = firebase.functions().httpsCallable("authentication.access");
    access({ path: this.$route.path }).catch(function (error) { 
      self.$router.push({ path: '/error/' + error.status });
    });
  }
}
