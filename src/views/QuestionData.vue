<template>
  <v-container fluid>
      <v-row>
      <v-col>
        <v-btn color="primary" :to="{path: '/system/subjects/add'}">
          <v-icon>mdi-pencil-plus</v-icon>
          {{ $t('question-data.add') }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="questions"
          class="elevation-1"
          :loading="loadding"
          loading-text
          hide-default-footer
        ></v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Mixins, Component } from "vue-property-decorator";
import ScreenMixin from "@/mixins/screen";
import QuestionDataMixin from "@/mixins/logic/question-data";
import HeaderDatatableType from '../types/HeaderDatatableType';

@Component
export default class QuestionData extends Mixins(QuestionDataMixin, ScreenMixin) {
  private subjectId: string = "";
  private headers: HeaderDatatableType[] = [
    { text: "questions.subtitle", value: "id", sortable: false },
    { text: "questions.type", value: "name", sortable: false },
    { text: "questions.user", value: "disabled", sortable: false }
  ];

  constructor() {
    super();
    this.beforeOfCreated = this.beforeOfCreatedFunc;
    this.afterOfCreated = this.afterOfCreatedFunc;
  }

  get loadding() {
    return !(this.questions && this.questions.length > 0);
  }

  async beforeOfCreatedFunc() {
    this.subjectId = this.$route.params.id;
  }

  async afterOfCreatedFunc() {
    return await this.bindQuestions(this.subjectId);
  }
}
</script>

<style>
</style>