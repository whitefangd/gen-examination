<template>
  <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import { Action, Getter } from 'vuex-class';

@Component
export default class Loading extends Vue {
  @Getter("loading") loading!: boolean;
  @Watch("loading") watchLoading() { }
}
</script>
<style>
</style>