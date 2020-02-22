import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messageVN from "@/lang/message-vn.json";

Vue.use(VueI18n)

const messages = {
  vn : messageVN
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'vn', // set locale
  messages
});

export default i18n