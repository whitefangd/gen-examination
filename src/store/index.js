import Vue from 'vue'
import Vuex from 'vuex'

import getters from "./getters";
import state from "./state";

Vue.use(Vuex)

const store = new Vuex.Store({
  state: state,
  getters: getters
});

export default store;