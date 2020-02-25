// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import '@mdi/font/css/materialdesignicons.css'
import i18n from "./i18n";

Vue.use(Vuetify)

const vuetify = new Vuetify({
  icons : {
    iconfont: "mdiSvg"
  },
  lang: {
    t: (key: string, ...params: Array<string | number>) => i18n.t(key, params).toString()
  }
});

export default vuetify