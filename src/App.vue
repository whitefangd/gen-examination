<template>
  <router-view></router-view>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Action } from 'vuex-class';

@Component
export default class App extends Vue {
  @Action("bindSubjects") bindSubjects!: () => void;
  drawer: boolean;

  constructor() {
    super();
    this.drawer = false;
    this.$vuetify.theme.dark = false;
  }

  created() {
    this.bindSubjects();
  }
}
</script>