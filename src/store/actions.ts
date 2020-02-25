import { ActionTree, ActionContext } from 'vuex'
import State from '@/store/state'

const ACTIONS: ActionTree<State, State> = {

    googleToken(context: ActionContext<State, State>, token: string) {
        context.commit('googleToken', token);
    },
    pushError(context: ActionContext<State, State>, detail: any) {
        context.commit('cleanAlertMessage');
        context.commit('alertMessage', {
            type: "ERROR",
            message: detail.message,
            detail: detail
        });
    }
}

export default ACTIONS;