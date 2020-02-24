<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  props: {},
  data: function() {
    return {
      drawer: null
    };
  },
  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>