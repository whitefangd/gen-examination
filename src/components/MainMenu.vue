<template>
  <v-navigation-drawer v-model="drawer" app clipped>
    <v-list dense>
      <template v-for="menu in menus">
        <v-list-group :key="menu.id" v-if="menu.isGroup">
          <template v-slot:activator>
            <v-list-item-title>{{ $t(menu.title)}}</v-list-item-title>
          </template>
          <v-list-item :key="subItem.id" v-for="subItem in menu.children" link >
            <v-list-item-icon>
              <v-icon>{{ subItem.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t(subItem.title)}}</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-item :key="menu.id" v-else link>
          <v-list-item-icon>
            <v-icon>{{ menu.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ $t(menu.title)}}</v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import menus from "@/setting/menu.json";

export default {
  name: "MainMenu",
  props: ["drawer"],
  data: function() {
    return {
      menus: menus
    };
  }
};
</script>

<style>
</style>