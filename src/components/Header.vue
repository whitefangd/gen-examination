<template>
  <v-app-bar app clipped-left>
    <v-app-bar-nav-icon @click="clickIconMenu()" />
    <v-toolbar-title>{{ $t('title') }}</v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Header',
  props:['show'],
  data: function() {
    return {
      drawing: this.show,
    }
  },
  methods:{
    clickIconMenu: function() {
      this.drawing = !this.drawing;
      this.$emit("click-icon-menu", this.drawing);
    }
  }
};
</script>

<style>
</style>