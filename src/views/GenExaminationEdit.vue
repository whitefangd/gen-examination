<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-btn color="success">
          <v-icon>mdi-content-save</v-icon>
          {{ $t('save') }}
        </v-btn>
        <v-btn color="secondary">
          <v-icon>mdi-cancel</v-icon>
          {{ $t('cancel') }}
        </v-btn>
      </v-col>
      <v-spacer />
      <v-col>
        <v-btn color="error float-right" v-if="id">
          <v-icon>mdi-delete</v-icon>
          {{ $t('delete') }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      
    </v-row>
    <v-row>
      <v-col>
        <v-btn color="success">
          <v-icon>mdi-content-save</v-icon>
          {{ $t('save') }}
        </v-btn>
        <v-btn color="secondary">
          <v-icon>mdi-cancel</v-icon>
          {{ $t('cancel') }}
        </v-btn>
      </v-col>
      <v-spacer />
      <v-col>
        <v-btn color="error float-right" v-if="id">
          <v-icon>mdi-delete</v-icon>
          {{ $t('delete') }}
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
export default class GenExaminationEdit extends Mixins(
  GenExaminationMixin,
  ScreenMixin
) {}
</script>

<style>
</style>