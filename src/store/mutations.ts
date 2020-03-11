import { MutationTree } from 'vuex'
import State from '@/store/state'
import { vuexfireMutations } from 'vuexfire'

const MUTATIONS: MutationTree<any> = {
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

export default Object.assign(vuexfireMutations, MUTATIONS);