// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import '@mdi/font/css/materialdesignicons.css'
import i18n from "./i18n.js";

Vue.use(Vuetify)

const opts = {
  icons: {
    iconfont: 'mdiSvg'
  },
  lang: {
    t: (key, ...params) => {
      return i18n.t(key, params)
    },
  },
}

export default new Vuetify(opts)