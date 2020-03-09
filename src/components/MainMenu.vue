<template>
  <v-navigation-drawer v-model="drawing" @input="updatedDrawing" app clipped>
    <v-list dense>
      <template v-for="menu in menus">
        <v-list-group :key="menu.id" v-if="menu.isGroup" no-action>
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon color="primary">{{ menu.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t(menu.title)}}</v-list-item-title>
          </template>
          <v-list-item :key="subItem.id" v-for="subItem in menu.children" link>
            <v-list-item-title>{{ $t(subItem.title)}}</v-list-item-title>
            <v-list-item-icon>
              <v-icon color="primary">{{ menu.icon }}</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
        <v-list-item :key="menu.id" v-else link>
          <v-list-item-icon>
            <v-icon color="primary">{{ menu.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ $t(menu.title)}}</v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import menus from "@/setting/menu.json";
import Vue from "vue";
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";

@Component
export default class SystemMenu extends Vue {
  @Prop(Boolean) show!: boolean;
  @Watch('show')
  watchShow(val: boolean, oldVal: boolean) {
    this.drawing = val
  }

  menus = menus;
  drawing = false;
  created() {
    this.drawing = this.show
  }
  updatedDrawing(value: boolean) {
    this.$emit("updated-drawing", this.drawing);
  }
}
</script>

<style>
</style>