<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="6">
            <v-card class="elevation-12">
              <v-toolbar flat>
                <v-toolbar-title>{{$t('register-title')}}</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <Alert></Alert>
                <v-form>
                  <v-text-field
                    :label="$t('username')"
                    name="username"
                    v-model="username"
                    prepend-icon="mdi-account"
                    type="text"
                  />
                  <v-text-field
                    :label="$t('password')"
                    v-model="password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                  />
                  <v-text-field
                    :label="$t('re-password')"
                    v-model="repassword"
                    name="re-password"
                    prepend-icon="mdi-lock"
                    type="password"
                  />
                </v-form>
                <v-alert dense elevation="10" style="max-height: 300px" class="overflow-y-auto">
                  <v-container>
                    <v-row>
                      <v-col>
                        <h3 align="center" justify="center">{{$t('license')}}</h3>
                      </v-col>
                    </v-row>
                    <v-row align="center" justify="center">
                      <v-col v-html="LICENSE"></v-col>
                    </v-row>
                  </v-container>
                </v-alert>
                <div id="recaptcha-container"></div>
              </v-card-text>
              <v-card-actions>
                <v-btn :to="{path: '/login'}">
                  {{$t('login')}}
                  <v-icon right>mdi-login</v-icon>
                </v-btn>
                <v-spacer />
                <v-btn @click="register">
                  {{$t('register')}}
                  <v-icon right>mdi-account-edit</v-icon>
                </v-btn>
                <v-btn @click="loginByGoogle">
                  <v-icon>mdi-google</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import * as firebase from "firebase";
import RegisterMixin from "@/mixins/register";
import LoginMixin from "@/mixins/login";
import LICENSE from "!!raw-loader!@/LICENSE";
import AuthenticationMixin from "@/mixins/authentication";

@Component
export default class Register extends mixins(
  LoginMixin,
  RegisterMixin,
  AuthenticationMixin
) {
  data() {
    return {
      LICENSE: LICENSE
    };
  }

  get username(): string {
    return this._register_username;
  }

  set username(value: string) {
    this._register_username = value;
  }

  get password(): string {
    return this._register_password;
  }

  set password(value: string) {
    this._register_password = value;
  }

  get repassword(): string {
    return this._register_repassword;
  }

  set repassword(value: string) {
    this._register_repassword = value;
  }
}
</script>

<style>
</style>