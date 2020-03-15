import Vue from 'vue'
import { Component, Watch } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import SubjectsEntity from '@/types/entities/SubjectsEntity';

@Component
export default class SubjectsMixin extends Vue {
  @Getter("subjects") subjects!: Array<SubjectsEntity>;
  @Getter("database") database!: firebase.firestore.Firestore;
  @Watch("subjects") watchSubjects() { }
  @Action('pushError') pushError!: (detail: any) => void
  @Action('pushSuccess') pushSuccess!: (detail: any) => void

  async findSubjectById(id: string): Promise<SubjectsEntity | undefined> {
    let subjectQuery = await this.database.collection("subjects").doc(id).get();
    let subjectData = subjectQuery.data();
    if (subjectQuery.exists && subjectData) {
      let subject: SubjectsEntity = {
        id: subjectQuery.id,
        name: subjectData["name"],
        disabled: subjectData["disabled"],
        sortkey: subjectData["sortkey"],
      }
      return subject;
    } else {
      return undefined;
    }
  }

  async update(subject: SubjectsEntity): Promise<boolean> {
    return await this.database.collection("subjects").doc(subject.id).update(subject).then(onfulfilled => {
      return true;
    }).catch(onrejected => {
      return false;
    });
  }

  async create(subject: SubjectsEntity) {
    return await this.database.collection("subjects").doc(subject.id).set(subject).then(onfulfilled => {
      return true;
    }).catch(onrejected => {
      return false;
    });
  }
}