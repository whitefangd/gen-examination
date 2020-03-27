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
          <v-list-item :key="subItem.id" v-for="subItem in menu.children" link @click="action($event, subItem.actionCmd, subItem)">
            <v-list-item-title>{{ $t(subItem.title)}}</v-list-item-title>
            <v-list-item-icon>
              <v-icon color="primary">{{ menu.icon }}</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
        <v-list-item :key="menu.id" v-else link @click="action">
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
import ScreenMixin from '@/mixins/screen';
import SubjectsMixin from '@/mixins/logic/subjects';
import { MENU, ACTION_COMMAND } from '@/common/constant';
import SubjectsEntity from '../types/entities/SubjectsEntity';

@Component
export default class SystemMenu extends Mixins(SubjectsMixin, ScreenMixin) {
  @Prop(Boolean) show!: boolean;
  @Watch('show')
  watchShow(val: boolean, oldVal: boolean) {
    this.drawing = val
  }

  menus = menus;
  drawing = false;
  
  constructor() {
    super();
    this.afterOfCreated = this.afterOfCreatedFunc;
  }

  async afterOfCreatedFunc() {
    this.drawing = this.show;
    await this.bindSubjects();
    await this.generate();
  }

  async generate() {
    this.menus.forEach((menu) => {
      if(menu.isGroup && menu.id === MENU.EXAMINATION) {
        this.generateExamination(menu);
      } else if(menu.isGroup && menu.id === MENU.QUESTION) {
        this.generateQuestion(menu);
      }
    })
  }

  generateExamination(menu: any) {
    if(!(menu.children instanceof Array )) {
      menu.children = [];
    }
    menu.children = this.subjects.map((value: SubjectsEntity, index: number, array: SubjectsEntity[]) => {
      return {
        isGroup: false,
        id: MENU.EXAMINATION.slice(0, MENU.EXAMINATION.length - ("" + index).length) + index,
        icon: "mdi-label",
        title: value.name,
        children: null,
        actionCmd: ACTION_COMMAND.GEN_EXAMINATION,
        value: value.id,
      }
    })
  }

  generateQuestion(menu: any) {
    if(!(menu.children instanceof Array )) {
      menu.children = [];
    }
    menu.children = this.subjects.map((value: SubjectsEntity, index: number, array: SubjectsEntity[]) => {
      return {
        isGroup: false,
        id: MENU.QUESTION.slice(0, MENU.QUESTION.length - ("" + index).length) + index,
        icon: "mdi-label",
        title: value.name,
        children: null,
        actionCmd: ACTION_COMMAND.QUESTION,
        value: value.id,
      }
    })
  }

  updatedDrawing(value: boolean) {
    this.$emit("updated-drawing", this.drawing);
  }

  action($event:MouseEvent, actionCmd: string, menu:any) {
    if(actionCmd === ACTION_COMMAND.GEN_EXAMINATION) {
      this.$router.push({name: "GenExamination", params: {id: menu.value}});
    } else if(actionCmd === ACTION_COMMAND.QUESTION) {
      this.$router.push({name: "QuestionData", params: {id: menu.value}});
    }
  }
}
</script>

<style>
</style>