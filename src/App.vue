<template>
  <router-view></router-view>
</template>

<script lang="ts">
import Vue from "vue";
import Component from 'vue-class-component'

@Component
export default class App extends Vue {
  drawer: boolean;

  constructor() {
    super()
    this.drawer = false;
    this.$vuetify.theme.dark = true;
  }
};
</script>