<template>
  <v-dialog v-model="show" persistent :max-width="maxWidth">
    <v-card>
      <v-card-title class="headline" :class="color">{{ title }}</v-card-title>
      <v-card-text>{{ content }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" @click="cancel">{{ $t('cancel') }}</v-btn>
        <v-btn color="success" @click="ok">{{ $t('ok') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter } from "vuex-class";
import { Watch, Prop, PropSync } from "vue-property-decorator";

@Component
export default class ConfirmDialog extends Vue {
  @Prop({ default: false }) show!: boolean;
  @Prop({ default: "primary" }) color!: string;
  @Prop({ default: 400 }) maxWidth!: string | number;
  @Prop({ default: true }) title!: string;
  @Prop({ default: true }) content!: string;

  cancel() {
    this.$emit("cancel");
  }
  ok() {
    this.$emit("ok");
  }
}
</script>

<style>
</style>