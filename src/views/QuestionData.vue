<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-btn color="primary" @click="add">
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
        >
          <template v-slot:header.subtitle="{ header }">{{ $t(header.text) }}</template>
          <template v-slot:header.type="{ header }">{{ $t(header.text) }}</template>
          <template v-slot:header.user="{ header }">{{ $t(header.text) }}</template>

          <template v-slot:item.type="{ item }">{{ $t("question-type." + item.type) }}</template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Mixins, Component } from "vue-property-decorator";
import ScreenMixin from "@/mixins/screen";
import QuestionDataMixin from "@/mixins/logic/question-data";
import HeaderDatatableType from "@/types/HeaderDatatableType";

@Component
export default class QuestionData extends Mixins(
  QuestionDataMixin,
  ScreenMixin
) {
  private subjectId: string = "";
  private headers: HeaderDatatableType[] = [
    { text: "question-data.subtitle", value: "subtitle", sortable: false },
    { text: "question-data.type", value: "type", sortable: false },
    { text: "question-data.user", value: "user", sortable: false },
    { text: "", value: "actions", sortable: false }
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

  add() {
    const self = this;
    self.$router.push({
      name: "QuestionDataAdd",
      params: {
        "subject": self.subjectId
      }
    });
  }
}
</script>

<style>
</style>