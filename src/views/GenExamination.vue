<template>
  <v-container fluid>
      
  </v-container>
</template>

<script lang="ts">
import { Mixins, Component } from "vue-property-decorator";
import ScreenMixin from "@/mixins/screen";
import GenExaminationMixin from "@/mixins/logic/gen-examination";

@Component
export default class GenExamination extends Mixins(GenExaminationMixin, ScreenMixin) {
  private subjectId: string = "";

  constructor() {
    super();
    this.beforeOfCreated = this.beforeOfCreatedFunc;
    this.afterOfCreated = this.afterOfCreatedFunc;
  }

  async beforeOfCreatedFunc() {
    this.subjectId = this.$route.params.id;
  }

  async afterOfCreatedFunc() {

  }
}
</script>

<style>
</style>