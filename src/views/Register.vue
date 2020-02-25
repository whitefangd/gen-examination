<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
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
                    v-model="password"
                    name="re-password"
                    prepend-icon="mdi-lock"
                    type="password"
                  />
                </v-form>
                <v-card height="300px" style="{overflow-y: auto }">
                  <v-card-title>{{$t('license')}}</v-card-title>
                  <v-card-text>
                    <pre>{{LICENSE}}</pre>
                  </v-card-text>
                </v-card>
              </v-card-text>
              <v-card-actions>
                <v-btn>
                  {{$t('login')}}
                  <v-icon right>mdi-login</v-icon>
                </v-btn>
                <v-spacer />
                <v-btn @click="loginByAccount">
                  {{$t('register')}}
                  <v-icon right>mdi-account-edit</v-icon>
                </v-btn>
                <v-btn>
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
import RegisterMixin from "@/mixins/register";
import LICENSE from  "raw-loader!@/LICENSE";


@Component
export default class Register extends mixins(RegisterMixin) {
  data() {
    return {
      LICENSE: LICENSE
    };
  }
}
</script>

<style>
</style>