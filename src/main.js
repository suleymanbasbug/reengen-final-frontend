import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";
import Vuelidate from "vuelidate";
import i18n from './i18n'

Vue.use(Vuelidate);
Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount("#app");
