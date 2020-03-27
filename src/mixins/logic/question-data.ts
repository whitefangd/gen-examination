import Vue from 'vue'
import { Component, Watch } from "vue-property-decorator";
import { Getter, Action } from 'vuex-class';
import QuestionsEntity from '@/types/entities/QuestionsEntity';
import { QUESTION_TYPE } from '@/common/constant';

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

    get types(): Array<any> {
        return Object.keys(QUESTION_TYPE).map((value: any) => {
            const key: keyof typeof QUESTION_TYPE = value;
            return {
                key: key,
                value: QUESTION_TYPE[key],
                text: "question-type." + QUESTION_TYPE[key]
            };
        });
    }

    async findQuestionById(subject: string, id: string): Promise<QuestionsEntity | undefined> {
        let questionQuery = await this.database.collection('/subjects/' + subject + "/questions").doc(id).get();
        let questionData = questionQuery.data();
        if (questionQuery.exists && questionData) {
            let question: QuestionsEntity = {
                id: questionQuery.id,
                content: questionData["content"],
                deleted: questionData["deleted"],
                subtitle: questionData["subtitle"],
                type: questionData["type"],
                user: questionData["user"]
            }
            return question;
        } else {
            return undefined;
        }
    }
}