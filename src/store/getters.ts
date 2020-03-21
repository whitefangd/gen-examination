import { GetterTree } from 'vuex'
import State from '@/store/state'
import SubjectsEntity from '@/types/entities/SubjectsEntity';

const GETTERS: GetterTree<State, State> = {
  firebase(state: State): any {
    return state.firebase;
  },
  database(state: State): firebase.firestore.Firestore {
    return state.database;
  },
  alertMessage(state: State): Array<any> {
    return state.alertMessage;
  },
  googleToken(state: State): string {
    return state.googleToken;
  },
  subjects(state: State): Array<SubjectsEntity> {
    return state.subjects;
  },
  loading(state: State): boolean {
    return state.loading;
  }
};

export default GETTERS;