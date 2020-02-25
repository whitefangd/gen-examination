<template>
  <div>
    <v-alert
      v-for="(item, index) in info"
      :key="'info-' + index"
      dense
      type="info"
      icon="mdi-emoticon-neutral"
    >{{$t(item.message)}}</v-alert>
    <v-alert
      v-for="(item, index) in success"
      :key="'success-' + index"
      dense
      type="success"
      icon="mdi-emoticon-happy"
    >{{$t(item.message)}}</v-alert>
    <v-alert
      v-for="(item, index) in warning"
      :key="'warning-' + index"
      dense
      type="warning"
      icon="mdi-emoticon-devil"
    >{{$t(item.message)}}</v-alert>
    <v-alert
      v-for="(item, index) in error"
      :key="'error-' + index"
      dense
      type="error"
      icon="mdi-emoticon-dead"
    >{{$t(item.message)}}</v-alert>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";

@Component
export default class Alert extends Vue {
  @Getter("alertMessage") alertMessage!: Array<any>;

  get info() {
    return this.alertMessage.filter(alert => alert.type == "INFO");
  }
  get success() {
    return this.alertMessage.filter(alert => alert.type == "SUCCESS");
  }
  get warning() {
    return this.alertMessage.filter(alert => alert.type == "WARNING");
  }
  get error() {
    return this.alertMessage.filter(alert => alert.type == "ERROR");
  }
}
</script>

<style>
</style>