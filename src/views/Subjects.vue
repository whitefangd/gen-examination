<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-btn color="red darken-4" :to="{path: '/system/subjects/add'}">
          <v-icon>mdi-pencil-plus</v-icon>
          {{ $t('subjects.add') }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="subjects"
          class="elevation-1"
          :loading="loadding"
          loading-text
          hide-default-footer
        >
          <template v-slot:header.id="{ header }">{{ $t(header.text) }}</template>
          <template v-slot:header.name="{ header }">{{ $t(header.text) }}</template>
          <template v-slot:header.disabled="{ header }">{{ $t(header.text) }}</template>
          <template v-slot:header.sortkey="{ header }">{{ $t(header.text) }}</template>

          <template v-slot:item.disabled="{ item }">
            <v-simple-checkbox v-model="item.disabled" color="red darken-4"></v-simple-checkbox>
          </template>
          <template v-slot:item.sortkey="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">mdi-arrow-up</v-icon>
            <v-icon small class="mr-2" @click="editItem(item)">mdi-arrow-down</v-icon>
          </template>
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
import Vue from "vue";
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";

import SubjectsEntity from "@/types/entities/SubjectsEntity";
import HeaderDatatableType from "@/types/HeaderDatatableType";
import SubjectsMixin from "@/mixins/logic/subjects";

@Component
export default class Subjects extends Mixins(SubjectsMixin) {
  headers: HeaderDatatableType[] = [
    { text: "subjects.key", value: "id", sortable: false },
    { text: "subjects.name", value: "name", sortable: false },
    { text: "subjects.disabled", value: "disabled", sortable: false },
    { text: "subjects.sortkey", value: "sortkey", sortable: false },
    { text: "", value: "actions", sortable: false }
  ];

  constructor() {
    super();
  }

  get loadding() {
    return !(this.subjects && this.subjects.length > 0);
  }

  created() {}

  editItem(item: SubjectsEntity) {
    this.$router.push({
      name: "SubjectEdit",
      params: {
        id: item.id
      }
    });
  }
}
</script>


<style>
</style>