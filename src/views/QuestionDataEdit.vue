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
      <v-col class="text-center">
        <v-menu bottom :offset-y="true">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on">{{ $t(type ? type.text : "") }}</v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(type, index) in types"
              :key="index"
              @click="selectType($event, type, index)"
            >
              <v-list-item-title>{{ $t(type.text) }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
      <v-spacer />
      <v-col>
        <v-btn color="error float-right" v-if="id" @click="deleteQuestion">
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
        <component v-model="question" v-bind:is="questionComponent"></component>
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
        <v-btn color="error float-right" v-if="id" @click="deleteQuestion">
          <v-icon>mdi-delete</v-icon>
          {{ $t('delete') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Mixins, Component } from "vue-property-decorator";
import QuestionDataMixin from "@/mixins/logic/question-data";
import ScreenMixin from "@/mixins/screen";
import { QUESTION_TYPE } from "@/common/constant";
import QuestionsEntity from "@/types/entities/QuestionsEntity";
import Questions from "@/components/questions";

@Component({
  components: Object.assign({}, Questions)
})
export default class QuestionDataEdit extends Mixins(
  QuestionDataMixin,
  ScreenMixin
) {
  private id: string = "";
  private copyId: string = "";
  private question: QuestionsEntity = {
    id: "",
    content: "",
    deleted: false,
    subtitle: "",
    type: QUESTION_TYPE.SURVEY,
    user: ""
  };
  private subject: string = "";
  private type: any = null;

  constructor() {
    super();
    this.afterOfCreated = this.afterOfCreatedFunc;
  }

  get questionComponent() {
    if (this.type) {
      return "Question" + this.type.value;
    } else {
      return "";
    }
  }

  selectType($event: MouseEvent, type: any, index: number) {
    this.type = type;
  }

  afterOfCreatedFunc(): Promise<any> {
    const self = this;
    this.subject = this.$route.params["subject"];
    this.id = this.$route.params["id"];
    this.copyId = this.$route.params["copyId"];
    return new Promise<any>((resolve, reject) => {
      let idItem = "";
      if (self.id) {
        idItem = self.id;
      } else if (self.copyId) {
        idItem = self.copyId;
      }
      if (idItem) {
        resolve(
          self.findQuestionById(self.subject, idItem).then(value => {
            if (value) {
              self.question = value;
              self.type = {
                value: value.type,
                text: "question-type." + value.type
              };
            }
            return value;
          })
        );
      } else {
        self.type = {
          value: QUESTION_TYPE.SURVEY,
          text: "question-type." + QUESTION_TYPE.SURVEY
        };
        resolve();
      }
    });
  }

  async save() {
    const self = this;
    self.showLoading();
    let flag = false;
    if(self.question.content) {
      self.question.subtitle = self.question.content.substring(0, 25);
      if(self.question.content.length > 25) {
        self.question.subtitle += "...";
      }
    }
    if (self.id) {
      flag = await self.update(self.subject, self.question);
    } else {
      flag = await self.create(self.subject, self.question);
    }
    if (flag) {
      self.pushSuccess({ message: "SUC000010001" });
    } else {
      self.pushError({ message: "ERR000010001" });
    }
    self.hideLoading();
  }

  cancel() {
    const self = this;
    self.$router.replace({
      name: "QuestionData",
      params: {
        id: self.subject
      }
    });
  }

  async deleteQuestion() {
    const self = this;
    self.showLoading();
    if (self.id) {
      await self
        .delete(self.subject, self.question)
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