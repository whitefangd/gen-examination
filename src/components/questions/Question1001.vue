<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-col>
        <v-textarea outlined :label="$t('question-data.component.content')"></v-textarea>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn color="primary">Add</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6"  align="center">
        <v-row>
        <v-checkbox v-model="includeFiles" hide-details></v-checkbox>
        <v-text-field label="Include files"></v-text-field>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Mixins, Component, Prop } from "vue-property-decorator";
import QuestionsEntity from "@/types/entities/QuestionsEntity";

@Component
export default class Question1001 extends Vue {
  @Prop() data!: QuestionsEntity;
}
</script>

<style>
</style>