<template>
  <v-app id="inspire">
    <Header></Header>
    <MainMenu :drawer="drawer"></MainMenu>
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
    drawer: null
  }),
  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>