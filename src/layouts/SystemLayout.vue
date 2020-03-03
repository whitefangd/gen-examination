<template>
  <v-app id="inspire">
    <Header :show="drawer" @click-icon-menu="clickIconMenu"></Header>
    <SystemMenu :drawer="drawer"></SystemMenu>
    <v-content>
      <router-view></router-view>
    </v-content>
    <Footer></Footer>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Mixins, Prop } from "vue-property-decorator";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import SystemMenu from "@/components/SystemMenu.vue";

@Component({
  components: {
    Header,
    Footer,
    SystemMenu
  }
})
export default class SystemLayout extends Vue {

  private drawer: boolean;

  constructor() {
      super()
      this.drawer = true
  }

  clickIconMenu(show: boolean) {
    this.drawer = show;
  }
}
</script>
<style>
</style>