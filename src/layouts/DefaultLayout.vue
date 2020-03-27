<template>
  <v-app id="inspire">
    <Header :show="drawer" @click-icon-menu="updatedDrawing" type="default"></Header>
    <MainMenu :show="drawer" @updated-drawing="updatedDrawing"></MainMenu>
    <v-content>
      <router-view></router-view>
    </v-content>
    <Footer></Footer>
    <Loading></Loading>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Loading from "@/components/Loading.vue";
import MainMenu from "@/components/MainMenu.vue";
import { Prop, Component } from "vue-property-decorator";

@Component({
  components: {
    Header,
    Footer,
    MainMenu,
    Loading
  }
})
export default class DefaultLayout extends Vue {
  @Prop({ default: "", type: String }) source!: string;

  private drawer: boolean;

  constructor() {
    super();
    this.drawer = true;
  }

  created() {
    this.$vuetify.theme.dark = false;
  }

  updatedDrawing(value: boolean) {
    this.drawer = value;
  }
}
</script>