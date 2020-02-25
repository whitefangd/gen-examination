// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App.vue'
import Alert from '@/components/Alert.vue'
import router from '@/router'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import i18n from '@/plugins/i18n' // path to vuetify export
import store from '@/store';
import "@/plugins/sessionstorage"

Vue.config.productionTip = false

Vue.component("Alert", Alert);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  vuetify,
  i18n,
  router,
  components: { App },
  template: '<App/>'
})
