import Vue from "vue";
import Vuex from "vuex";
// import { getByFactoryId } from "../services/Unit";
// import { calculateDay } from "../plugins/utils";
import { auth } from "../store/modules/auth";
import { factory } from "../store/modules/factory";
import { unit } from "../store/modules/unit";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    factory,
    unit,
  },
});
