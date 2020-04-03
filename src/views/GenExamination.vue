<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-btn color="primary" @click="add">
          <v-icon>mdi-pencil-plus</v-icon>
          {{ $t('gen-exanination.add') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Mixins, Component } from "vue-property-decorator";
import ScreenMixin from "@/mixins/screen";
import GenExaminationMixin from "@/mixins/logic/gen-examination";

@Component
export default class GenExamination extends Mixins(
  GenExaminationMixin,
  ScreenMixin
) {
  private subjectId: string = "";

  constructor() {
    super();
    this.beforeOfCreated = this.beforeOfCreatedFunc;
    this.afterOfCreated = this.afterOfCreatedFunc;
  }

  async beforeOfCreatedFunc() {
    this.subjectId = this.$route.params.id;
  }

  async afterOfCreatedFunc() {}

  add() {
    const self = this;
    self.$router.push({
      name: "GenExaminationAdd",
      params: {
        subject: self.subjectId
      }
    });
  }
}
</script>

<style>
</style>