<template>
</template>

<script lang="ts">
import SiteMap from "@/types/SiteMap";
import Component, { mixins } from "vue-class-component";
import LoginMixin from "@/mixins/login";
import AuthenticationMixin from "@/mixins/authentication";

@Component
export default class PageSetting extends mixins(AuthenticationMixin) {
  private siteMap: []SiteMap | null;
  constructor() {
    super();
    this.siteMap = null
  }

  created() {
    debugger;
  }
}
</script>

<style>
</style>