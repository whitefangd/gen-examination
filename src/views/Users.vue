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
                <th>Group key</th>
                <th>Group name</th>
                <th>access</th>
                <th>read</th>
                <th>create</th>
                <th>modify</th>
                <th>delete</th>
                <th>execute</th>
                <th>special_permission</th>
                <th>special_permission</th>
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
                  <v-checkbox></v-checkbox>
                </td>
                <td>
                  <v-checkbox></v-checkbox>
                </td>
                <td>
                  <v-checkbox></v-checkbox>
                </td>
                <td>
                  <v-checkbox></v-checkbox>
                </td>
                <td>
                  <v-checkbox></v-checkbox>
                </td>
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";

@Component
export default class Users extends Vue {}
</script>

<style>
</style>