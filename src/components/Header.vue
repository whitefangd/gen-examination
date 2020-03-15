<template>
  <v-app-bar app clipped-left :color="color" dark>
    <v-app-bar-nav-icon @click="clickIconMenu()" />
    <v-toolbar-title>
      <v-btn icon @click="goHome">
        <v-icon>mdi-home-variant</v-icon>
      </v-btn>
      {{ $t('title') }}
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon dark v-on="on">
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </template>

      <v-card v-if="isNotLogin">
        <v-list>
          <v-list-item link :to="{path: '/login'}">
            <v-list-item-title>{{$t('login')}}</v-list-item-title>
            <v-list-item-icon>
              <v-icon>mdi-login</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-card>
      <v-card v-else>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-if="currentUser.displayName">{{ currentUser.displayName }}</v-list-item-title>
              <v-list-item-subtitle v-if="currentUser.displayName">{{ currentUser.email }}</v-list-item-subtitle>
              <v-list-item-title v-if="!currentUser.displayName">{{ currentUser.email }}</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon>
                <v-icon>mdi-account</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item link :to="{path: '/system'}">
            <v-list-item-title>{{$t('system-management')}}</v-list-item-title>
            <v-list-item-icon>
              <v-icon>mdi-code-braces</v-icon>
            </v-list-item-icon>
          </v-list-item>

          <v-list-item link>
            <v-list-item-title>{{$t('general-setting')}}</v-list-item-title>
            <v-list-item-icon>
              <v-icon>mdi-settings</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="logout">{{$t("logout")}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts">
import * as firebase from "firebase/app";
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import LoginMixin from "@/mixins/logic/login";
import AuthenticationMixin from "@/mixins/logic/authentication";
import LogoutMixin from "@/mixins/logic/logout";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";

@Component
export default class Header extends Mixins(AuthenticationMixin, LogoutMixin) {
  @Prop(String) type!: "default" | "system";
  @Prop(Boolean) show!: boolean;
  @Watch("show")
  watchShow(val: boolean, oldVal: boolean) {
    this.drawing = val;
  }
  @Getter("firebase") firebase!: typeof firebase;

  private menu: boolean = false;
  private currentUser: firebase.User | null;
  private drawing = false;

  constructor() {
    super();
    this.currentUser = null;
  }

  created() {
    const self = this;
    this.firebase.auth().onAuthStateChanged(user => {
      if (user) {
        self.currentUser = user;
      }
    });
    this.drawing = this.show;
  }

  mounted() {}

  get isNotLogin(): boolean {
    return this.currentUser == null;
  }

  get color(): string {
    switch (this.type) {
      case "default":
        return "primary";
      case "system":
        return "red darken-4";
      default:
        return "primary";
    }
  }

  clickIconMenu() {
    this.drawing = !this.drawing;
    this.$emit("click-icon-menu", this.drawing);
  }
  goHome() {
    this.$router.push({ path: "/" });
  }
}
</script>

<style>
</style>