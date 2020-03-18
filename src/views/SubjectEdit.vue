<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-btn color="success" @click="save">
          <v-icon>mdi-content-save</v-icon>
          {{ $t('save') }}
        </v-btn>
        <v-btn color="secondary" @click="cancel">
          <v-icon>mdi-cancel</v-icon>
          {{ $t('cancel') }}
        </v-btn>
      </v-col>
      <v-spacer />
      <v-col>
        <v-btn color="error float-right">
          <v-icon>mdi-delete</v-icon>
          {{ $t('delete') }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <Alert></Alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-form ref="subject" lazy-validation>
          <v-divider class="mx-4"></v-divider>
          <v-text-field v-model="subject.id" :counter="25" :label="$t('subjects.key')"></v-text-field>
          <v-text-field v-model="subject.name" :counter="50" :label="$t('subjects.name')"></v-text-field>
          <v-checkbox
            color="red darken-4"
            v-model="subject.disabled"
            :label="$t('subjects.disabled')"
          ></v-checkbox>
          <v-divider class="mx-4"></v-divider>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn color="success" @click="save">
          <v-icon>mdi-content-save</v-icon>
          {{ $t('save') }}
        </v-btn>
        <v-btn color="secondary" @click="cancel">
          <v-icon>mdi-cancel</v-icon>
          {{ $t('cancel') }}
        </v-btn>
      </v-col>
      <v-spacer />
      <v-col>
        <v-btn color="error float-right">
          <v-icon>mdi-delete</v-icon>
          {{ $t('delete') }}
        </v-btn>
      </v-col>
    </v-row>
    <confirm-dialog
      :show="show"
      @cancel="confirmCancel"
      @ok="confirmOk"
      :title="$t('dialog-confirm.title')"
      :content="$t('dialog-confirm.change-content')"
    ></confirm-dialog>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";

import SubjectsMixin from "@/mixins/logic/subjects";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import SubjectsEntity from "../types/entities/SubjectsEntity";

@Component({
  components: { "confirm-dialog": ConfirmDialog }
})
export default class SubjectEdit extends Mixins(SubjectsMixin) {
  show = false;
  subject: SubjectsEntity = {
    id: "",
    disabled: false,
    name: "",
    sortkey: -1
  };

  get id(): string {
    return this.$route.params["id"];
  }

  async created() {
    if (this.id) {
      let tempObj = await this.findSubjectById(this.id);
      if (tempObj) {
        this.subject = tempObj;
      }
    }
  }

  cancel() {
    this.show = true;
  }

  confirmCancel() {
    this.show = false;
  }

  confirmOk() {
    this.show = false;
    this.$router.replace({
      name: "Subjects"
    });
  }

  async save() {
    const self = this;
    let flag = false;
    if (this.id) {
      flag = await this.update(this.subject);
    } else {
      flag = await this.create(this.subject);
    }
    if (flag) {
      this.pushSuccess({ message: "SUC000010001" });
      let successWaiting = setTimeout(function() {
        clearTimeout(successWaiting);
        self.$router.replace({
          name: "Subjects"
        });
      }, 3000);
    } else {
      this.pushError({ message: "ERR000010001" });
    }
  }
}
</script>

<style>
</style>