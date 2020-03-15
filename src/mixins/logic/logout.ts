import Vue from 'vue'
import firebase from "firebase/app";
import { Component } from "vue-property-decorator";
import {
    State,
    Getter,
    Action,
    Mutation,
    namespace
} from 'vuex-class'

@Component
export default class LogoutMixin extends Vue {
    [key: string]: any;
    @Getter("firebase") firebase!: typeof firebase

    constructor() {
        super()
    }

    logout() {
        const self = this;
        self.firebase.auth().signOut().then(() => {
            self.currentUser = null;
            if (self.$route.path !== '/') {
                self.$router.push({ path: '/' });
            }
        }).catch((error) => {
            self.$router.push({ path: '/error/' + error.code });
        });
    }
}