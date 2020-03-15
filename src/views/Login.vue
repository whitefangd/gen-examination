<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height grey lighten-2" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar flat color="primary" dark>
                <v-toolbar-title>{{$t('login-title')}}</v-toolbar-title>
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
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="secondary" :to="{path: '/register'}">
                  {{$t('register')}}
                  <v-icon right>mdi-account-edit</v-icon>
                </v-btn>
                <v-spacer />
                <v-btn @click="loginByAccount" color="primary">
                  {{$t('login')}}
                  <v-icon right>mdi-login</v-icon>
                </v-btn>
                <v-btn color="red darken-4" dark @click="loginByGoogle">
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
import LoginMixin from "@/mixins/logic/login";
import AuthenticationMixin from "@/mixins/logic/authentication";


@Component
export default class Login extends mixins(LoginMixin, AuthenticationMixin) {
  
  constructor() {
    super();
  }

  get username(): string {
    return this._login_username;
  }

  set username(value: string) {
    this._login_username = value;
  }

  get password(): string {
    return this._login_password;
  }

  set password(value: string) {
    this._login_password = value;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
