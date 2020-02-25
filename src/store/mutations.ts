import { MutationTree } from 'vuex'
import State from '@/store/state'

const MUTATIONS: MutationTree<State> = {
    googleToken(state: State, token: string) {
        state.googleToken = token;
    },
    alertMessage(state: State, alert: any) {
        state.pushAlertMessage(alert);
    },
    cleanAlertMessage(state: State) {
        state.cleanAlertMessage();
    }
}

export default MUTATIONS;