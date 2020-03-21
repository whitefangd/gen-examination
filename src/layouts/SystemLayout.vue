<template>
  <v-app id="inspire">
    <Header :show="drawer" @click-icon-menu="updatedDrawing" type="system"></Header>
    <SystemMenu :show="drawer" @updated-drawing="updatedDrawing"></SystemMenu>
    <v-content>
      <router-view></router-view>
    </v-content>
    <Footer></Footer>
    <Loading></Loading>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Mixins, Prop } from "vue-property-decorator";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Loading from "@/components/Loading.vue";
import SystemMenu from "@/components/SystemMenu.vue";
import RouteView from "@/router/RouteView.vue";
import { Action } from 'vuex-class';

@Component({
  components: {
    Header,
    Footer,
    SystemMenu,
    RouteView,
    Loading
  }
})
export default class SystemLayout extends Vue {
  private drawer: boolean;

  constructor() {
    super();
    this.drawer = true;
  }

  created() {
    this.$vuetify.theme.dark = true;
  }

  updatedDrawing(show: boolean) {
    this.drawer = show;
  }
}
</script>
<style>
</style>