<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-form ref="subject" lazy-validation>
          <v-btn color="red darken-4">{{ $t('subjects.save') }}</v-btn>
          <v-btn color="red darken-4">{{ $t('subjects.cancel') }}</v-btn>
          <v-btn color="red darken-4">{{ $t('subjects.delete') }}</v-btn>
          <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";

@Component
export default class SubjectEdit extends Vue {}
</script>

<style>
</style>