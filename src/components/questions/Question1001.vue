<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-textarea
          outlined
          v-model="data.content"
          @input="handleInput"
          :label="$t('question-data.component.content')"
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2">
        <v-btn color="primary" @click="add">
          <v-icon>mdi-plus</v-icon>Add
        </v-btn>
      </v-col>
    </v-row>
    <v-radio-group v-model="rightAnswer" @change="handleInputRightAnser">
      <v-row v-if="data.answers && data.answers.length">
        <v-col cols="6" :key="index" v-for="(item, index) in data.answers" class="pt-0 pb-0">
          <v-container fluid class="pt-0 pb-0">
            <v-row>
              <v-radio :value="index" color="success"></v-radio>
              <v-text-field
                @input="handleInput"
                :label="$t('question-data.component.answer')"
                v-model="item.content"
              >
                <v-btn color="error" @click="remove(item, index)" slot="append" icon>
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-text-field>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-radio-group>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Mixins, Component, Prop, Watch } from "vue-property-decorator";
import {
  QuestionsEntity1001,
  Question1001AnswerModel
} from "@/types/entities/QuestionsEntity";
import { QUESTION_TYPE } from "@/common/constant";

@Component
export default class Question1001 extends Vue {
  @Prop() value!: QuestionsEntity1001;

  private rightAnswer: number = 0;

  @Watch("value") watchData(
    val: QuestionsEntity1001,
    oldVal: QuestionsEntity1001
  ) {
    if (val) {
      this.data.id = val.id;
      this.data.content = val.content;
      this.data.answers = val.answers;
      this.data.deleted = val.deleted;
      this.data.subtitle = val.subtitle;
      this.data.type = val.type;
      this.data.user = val.user;
      if (this.data.answers) {
        this.rightAnswer = this.data.answers.findIndex(
          (
            value: Question1001AnswerModel,
            index: number,
            obj: Question1001AnswerModel[]
          ) => {
            return value["right-answer"];
          }
        );
      }
    }
  }

  created() {
    if (this.value) {
      this.data.id = this.value.id;
      this.data.content = this.value.content;
      this.data.answers = this.value.answers;
      this.data.deleted = this.value.deleted;
      this.data.subtitle = this.value.subtitle;
      this.data.type = this.value.type;
      this.data.user = this.value.user;
      if (this.data.answers) {
        this.rightAnswer = this.data.answers.findIndex(
          (
            value: Question1001AnswerModel,
            index: number,
            obj: Question1001AnswerModel[]
          ) => {
            return value["right-answer"];
          }
        );
      }
    }
  }

  private data: QuestionsEntity1001 = {
    id: "",
    content: "",
    answers: [],
    deleted: false,
    subtitle: "",
    type: QUESTION_TYPE.SURVEY,
    user: ""
  };

  add() {
    if (!this.data.answers) {
      this.data.answers = [];
    }
    this.data.answers.push({
      "right-answer": false,
      content: ""
    });
    this.handleInput();
  }

  remove(item: Question1001AnswerModel, index: number) {
    if (index >= 0 && this.data.answers) {
      let first = this.data.answers.slice(0, index);
      let last = this.data.answers.slice(index + 1);
      this.data.answers = [...first, ...last];
      this.handleInput();
    }
  }

  handleInputRightAnser() {
    const self = this;
    if (self.data.answers) {
      self.data.answers.forEach(
        (
          value: Question1001AnswerModel,
          index: number,
          array: Question1001AnswerModel[]
        ) => {
          if (index === self.rightAnswer) {
            value["right-answer"] = true;
          } else {
            value["right-answer"] = false;
          }
        }
      );
    }
    this.handleInput();
  }

  handleInput() {
    this.$emit("input", this.data);
  }
}
</script>

<style>
</style>