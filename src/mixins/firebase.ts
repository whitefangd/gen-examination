import Vue from 'vue'
import Component from 'vue-class-component'
import * as firebase from "firebase/app";
import {
    State,
    Getter,
    Action,
    Mutation,
    namespace
} from 'vuex-class'

@Component
export default class Firebase extends Vue {
    @Getter("firebase") firebase!: typeof firebase
    @Getter("database") database!: firebase.firestore.Firestore;
}
