<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-btn>Add</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th>{{ $t('subjects.key') }}</th>
                <th>{{ $t('subjects.name') }}</th>
                <th>{{ $t('subjects.disabled') }}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Group key</td>
                <td>Group name</td>
                <td>
                  <v-checkbox></v-checkbox>
                </td>
                <td>
                  <v-btn icon>
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>mdi-check-bold</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-data-table :headers="headers" :items="subjects" :items-per-page="5" class="elevation-1"></v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";

declare class Header {
  text: string;
  value: string;
}

declare class DataSources {
  idL: string;
  key: string;
  name: string;
  disabled: boolean;

}

@Component
export default class Subjects extends Vue {
  @Getter("subjects") subjects!: Array<DataSources>;
  @Watch("subjects") watchSubjects() { }

  headers: Header[] = [
    { text: "subjects.key", value: "id" },
    { text: "subjects.key", value: "key" },
    { text: "subjects.name", value: "name" },
    { text: "subjects.disabled", value: "disabled" },
    
  ];

  constructor() {
    super();
  }

  created() {
    
  }
}
</script>


<style>
</style>