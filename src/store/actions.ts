import { ActionTree, ActionContext } from 'vuex'
import State from '@/store/state'
import { firestoreAction } from 'vuexfire'

const ACTIONS: ActionTree<State, State> = {

    googleToken(context: ActionContext<State, State>, token: string) {
        context.commit('googleToken', token);
    },
    cleanAlertMessage(context: ActionContext<State, State>) {
        context.commit('cleanAlertMessage');
    },
    pushError(context: ActionContext<State, State>, detail: any) {
        context.commit('cleanAlertMessage');
        context.commit('alertMessage', {
            type: "ERROR",
            message: detail.message,
            detail: detail
        });
    },
    pushSuccess(context: ActionContext<State, State>, detail: any) {
        context.commit('cleanAlertMessage');
        context.commit('alertMessage', {
            type: "SUCCESS",
            message: detail.message,
            detail: detail
        });
    },
    showLoading(context: ActionContext<State, State>) {
        context.commit('loading', true);
    },
    hideLoading(context: ActionContext<State, State>) {
        context.commit('loading', false);
    },
    bindSubjects: firestoreAction((context) => {
        let database: firebase.firestore.Firestore = context.getters.database
        return context.bindFirestoreRef('subjects', database.collection('subjects').orderBy("sortkey", "asc"))
    }),
    unbindSubjects: firestoreAction((context) => {
        context.unbindFirestoreRef('subjects');
    }),
}

export default ACTIONS;