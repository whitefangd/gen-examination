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
export default class RegisterMixin extends Vue {

  private username:string
  private password:string
  private repassword:string
  constructor() {
    super()
    this.username = "";
    this.password = "";
    this.repassword = "";
  }
}