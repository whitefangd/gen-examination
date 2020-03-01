import { GetterTree } from 'vuex'
import State from '@/store/state'

const GETTERS: GetterTree<State, State> = {
  firebase(state: State): any {
    return state.firebase;
  },
  alertMessage(state: State): Array<any> {
    return state.alertMessage;
  },
  googleToken(state: State): string {
    return state.googleToken;
  }
};

export default GETTERS;