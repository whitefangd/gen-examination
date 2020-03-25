import Vue from 'vue'
import { Component, Watch } from "vue-property-decorator";
import { Getter, Action } from 'vuex-class';
import QuestionsEntity from '@/types/entities/QuestionsEntity';

@Component
export default class QuestionDataMixin extends Vue {
    @Action("bindQuestions") bindQuestions!: (subjectId: string) => Promise<any>;
    @Action("unbindQuestions") unbindQuestions!: () => Promise<any>;
    @Getter("questions") questions!: Array<QuestionsEntity>;
    @Watch("questions") watchQuestions() { }
    @Getter("database") database!: firebase.firestore.Firestore;

    async destroyed() {
        return await this.unbindQuestions();
    }
}