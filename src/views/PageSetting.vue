<template>
  <v-container fluid>
    <v-row>
      <v-col cols="6">
        <v-treeview :items="siteMap"></v-treeview>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-title>Page name</v-card-title>
          <v-card-text>
            <v-divider class="primary"></v-divider>
            <v-list dense>
              <v-subheader>
                <span>Roles</span>
                <v-btn icon>
                  <v-icon>mdi-plus-circle</v-icon>
                </v-btn>
              </v-subheader>
              <v-list-item inactive>
                <v-list-item-content>
                  <v-list-item-title>aaaa</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon>
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item inactive>
                <v-list-item-content>
                  <v-list-item-title>aaaa</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon>
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <v-divider class="primary"></v-divider>
            <v-list dense>
              <v-subheader>
                <span>Groups</span>
                <v-btn icon>
                  <v-icon>mdi-plus-circle</v-icon>
                </v-btn>
              </v-subheader>
              <v-list-item inactive>
                <v-list-item-content>
                  <v-list-item-title>aaaa</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon>
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <v-divider class="primary"></v-divider>
            <v-list dense>
              <v-subheader>
                <span>Users</span>
                <v-btn icon>
                  <v-icon>mdi-plus-circle</v-icon>
                </v-btn>
              </v-subheader>
              <v-list-item inactive>
                <v-list-item-content>
                  <v-list-item-title>aaaa</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon>
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <v-divider class="primary"></v-divider>
          </v-card-text>
          <v-card-actions>
            <v-btn>Update</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { ROUTE_TREE, RouterOptions, RouteConfig } from "@/router";
import TreeItem from "@/types/TreeItem";
import Component, { mixins } from "vue-class-component";
import LoginMixin from "@/mixins/logic/login";
import AuthenticationMixin from "@/mixins/logic/authentication";

@Component
export default class PageSetting extends mixins(AuthenticationMixin) {
  private siteMap: Array<TreeItem> | null;

  constructor() {
    super();
    this.siteMap = [];
  }

  created() {
    if (ROUTE_TREE.routes) {
      const routes: RouteConfig[] = ROUTE_TREE.routes;
      let i = 0;
      this.siteMap = this.genTreeViewFromRoute(routes, i);
    }
  }

  private genTreeViewFromRoute(
    routes: RouteConfig[] | undefined,
    id: number
  ): TreeItem[] {
    const self = this;
    if (routes) {
      return routes.flatMap(item => {
        const result: TreeItem = {
          id: ++id,
          name: item.name,
          path: item.path,
          children: self.genTreeViewFromRoute(item.children, id)
        };
        return result;
      });
    }
    return [];
  }
}
</script>

<style>
</style>