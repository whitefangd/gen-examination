<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar flat>
                <v-toolbar-title>{{$t('title')}}</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
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
                <v-btn>
                  {{$t('register')}}
                  <v-icon right>mdi-account-edit</v-icon>
                </v-btn>
                <v-spacer />
                <v-btn @click="loginByAccount">
                  {{$t('login')}}
                  <v-icon right>mdi-login</v-icon>
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

<script>
import login from "@/mixins/login";

export default {
  name: "Login",
  mixins: [login],
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
