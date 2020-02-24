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

<script>
import { mapGetters } from "vuex";

export default {
  name: "Alert",
  computed: {
    info: self => self.alertMessage().filter(alert => alert.type == "INFO"),
    success: self =>
      self.alertMessage().filter(alert => alert.type == "SUCCESS"),
    warning: self =>
      self.alertMessage().filter(alert => alert.type == "WARNING"),
    error: self => self.alertMessage().filter(alert => alert.type == "ERROR")
  },
  methods: {
    ...mapGetters(["alertMessage"])
  }
};
</script>

<style>
</style>