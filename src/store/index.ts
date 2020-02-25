import Vue from 'vue'
import Vuex from 'vuex'

import GETTERS from "@/store/getters";
import State from "@/store/state";
import MUTATIONS from "@/store/mutations";
import ACTIONS from "@/store/actions";

Vue.use(Vuex)

export default new Vuex.Store<State>({
  state: State.instance,
  getters: GETTERS,
  mutations: MUTATIONS,
  actions: ACTIONS,
  strict: false
});
