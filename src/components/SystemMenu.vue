<template>
  <v-navigation-drawer v-model="drawing" @input="updatedDrawing" app clipped width="300">
    <v-list dense>
      <template>
        <v-list-group no-action>
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon color="red darken-3">mdi-account-settings</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t("system-menu.user-setting")}}</v-list-item-title>
          </template>
          <v-list-item link :to="{path: '/system/roles'}">
            <v-list-item-title>{{ $t("system-menu.role-list")}}</v-list-item-title>
            <v-list-item-icon>
              <v-icon color="red darken-3">mdi-account-star</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-list-item link :to="{path: '/system/groups'}">
            <v-list-item-title>{{ $t("system-menu.group-list")}}</v-list-item-title>
            <v-list-item-icon>
              <v-icon color="red darken-3">mdi-account-multiple-plus</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-list-item link :to="{path: '/system/users'}">
            <v-list-item-title>{{ $t("system-menu.user-list")}}</v-list-item-title>
            <v-list-item-icon>
              <v-icon color="red darken-3">mdi-account-multiple</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>

        <v-list-item link :to="{path: '/system/page-setting'}">
          <v-list-item-icon>
            <v-icon color="red darken-3">mdi-account-star</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ $t("system-menu.page-setting")}}</v-list-item-title>
        </v-list-item>

        <v-list-group no-action>
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon color="red darken-3">mdi-account-settings</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t("system-menu.examination-setting")}}</v-list-item-title>
          </template>
          <v-list-item link :to="{path: '/system/subjects'}">
            <v-list-item-title>{{ $t("system-menu.subjects-list")}}</v-list-item-title>
            <v-list-item-icon>
              <v-icon color="red darken-3">mdi-account-star</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-list-item link :to="{path: '/system/question'}">
            <v-list-item-title>{{ $t("system-menu.question-type")}}</v-list-item-title>
            <v-list-item-icon>
              <v-icon color="red darken-3">mdi-account-star</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";

@Component
export default class SystemMenu extends Vue {
  @Prop(Boolean) show!: boolean;
  @Watch("show")
  watchShow(val: boolean, oldVal: boolean) {
    this.drawing = val;
  }
  drawing = false;
  created() {
    this.drawing = this.show;
  }
  updatedDrawing(value: boolean) {
    this.$emit("updated-drawing", this.drawing);
  }
}
</script>

<style>
</style>