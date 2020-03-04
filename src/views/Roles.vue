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
                <th>Role key</th>
                <th>Role name</th>
                <th>access</th>
                <th>read</th>
                <th>create</th>
                <th>modify</th>
                <th>delete</th>
                <th>execute</th>
                <th>special_permission</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Role key</td>
                <td>Role name</td>
                <td><v-checkbox></v-checkbox></td>
                <td><v-checkbox></v-checkbox></td>
                <td><v-checkbox></v-checkbox></td>
                <td><v-checkbox></v-checkbox></td>
                <td><v-checkbox></v-checkbox></td>
                <td><v-checkbox></v-checkbox></td>
                <td><v-checkbox></v-checkbox></td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";

@Component
export default class SystemMenu extends Vue {}
</script>
</script>

<style>
</style>