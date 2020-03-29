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
      <v-col v-if="id">
        <v-btn color="error float-right" @click="deleteSubject">
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
      <v-col v-if="id">
        <v-btn color="error float-right" @click="deleteSubject">
          <v-icon>mdi-delete</v-icon>
          {{ $t('delete') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";

import SubjectsMixin from "@/mixins/logic/subjects";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import SubjectsEntity from "../types/entities/SubjectsEntity";
import ScreenMixin from "@/mixins/screen";

@Component({
  components: { "confirm-dialog": ConfirmDialog }
})
export default class SubjectEdit extends Mixins(SubjectsMixin, ScreenMixin) {
  id: string = "";
  subject: SubjectsEntity = {
    id: "",
    disabled: false,
    name: "",
    sortkey: -1
  };

  constructor() {
    super();
    this.afterOfCreated = this.afterOfCreatedFunc;
  }

  afterOfCreatedFunc(): Promise<any> {
    const self = this;
    this.id = this.$route.params["id"];
    return new Promise<any>((resolve, reject) => {
      if (self.id) {
        resolve(
          self.findSubjectById(self.id).then(value => {
            if (value) {
              self.subject = value;
            }
            return value;
          })
        );
      } else {
        resolve();
      }
    });
  }

  cancel() {
    this.$router.replace({
      name: "Subjects"
    });
  }

  async save() {
    const self = this;
    self.showLoading();
    let flag = false;
    if (self.id) {
      flag = await self.update(this.subject);
    } else {
      flag = await self.create(this.subject);
    }
    if (flag) {
      self.pushSuccess({ message: "SUC000010001" });
    } else {
      self.pushError({ message: "ERR000010001" });
    }
    self.hideLoading();
  }

  async deleteSubject() {
    const self = this;
    self.showLoading();
    if (self.id) {
      await self
        .delete(self.subject)
        .then(function() {
          self.id = "";
          self.pushSuccess({ message: "SUC000010002" });
        })
        .catch(function() {
          self.pushSuccess({ message: "ERR000010002" });
        })
        .finally(() => {
          self.hideLoading();
        });
    }
  }
}
</script>

<style>
</style>