import { GetterTree } from 'vuex'
import State from '@/store/state'

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
  subjects(state: State): any {
    return state.subjects;
  }
};

export default GETTERS;