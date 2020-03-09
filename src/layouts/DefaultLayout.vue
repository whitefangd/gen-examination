<template>
  <v-app id="inspire">
    <Header :show="drawer" @click-icon-menu="updatedDrawing" type="default"></Header>
    <MainMenu :show="drawer" @updated-drawing="updatedDrawing"></MainMenu>
    <v-content>
      <router-view></router-view>
    </v-content>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MainMenu from "@/components/MainMenu";

export default {
  name: "DefaultLayout",
  props: {
    source: String
  },
  components: {
    Header,
    Footer,
    MainMenu
  },
  data: () => ({
    drawer: true
  }),
  created() {
    this.$vuetify.theme.dark = false;
  },
  methods: {
    clickIconMenu: function(value) {
      this.drawer = value;
    },
    updatedDrawing: function(value) {
      this.drawer = value;
    }
  }
};
</script>