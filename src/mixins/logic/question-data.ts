import Vue from 'vue'
import { Component, Watch } from "vue-property-decorator";
import { Getter, Action } from 'vuex-class';
import QuestionsEntity from '@/types/entities/QuestionsEntity';
import { QUESTION_TYPE } from '@/common/constant';

@Component
export default class QuestionDataMixin extends Vue {
    @Action("bindQuestions") bindQuestions!: (subjectId: string) => Promise<any>;
    @Action("unbindQuestions") unbindQuestions!: () => Promise<any>;
    @Action('pushError') pushError!: (detail: any) => void
    @Action('pushSuccess') pushSuccess!: (detail: any) => void
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
            let question: QuestionsEntity = {};
            Object.keys(questionData).forEach((value: string, index: number, array: string[]) => {
                if(questionData) {
                    question[value] = questionData[value];
                }
            });
            return question;
        } else {
            return undefined;
        }
    }

    async update(subject: string, question: QuestionsEntity): Promise<boolean> {
        return await this.database.collection('/subjects/' + subject + "/questions").doc(question.id).update(question).then(onfulfilled => {
            return true;
        }).catch(onrejected => {
            return false;
        });
    }

    async create(subject: string, question: QuestionsEntity) {
        return await this.database.collection('/subjects/' + subject + "/questions").doc(question.id).set(question).then(onfulfilled => {
            return true;
        }).catch(onrejected => {
            return false;
        });
    }

}