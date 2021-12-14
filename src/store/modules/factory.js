import FactoryService from "../../services/Factory";

const initialState = {
  factories: [],
  selectedFactory: null,
};
export const factory = {
  namespaced: true,
  state: initialState,
  actions: {
    async getFactories({ commit }) {
      const factories = await FactoryService.getFactories();
      commit("setFactories", factories);
    },
  },
  mutations: {
    setFactories(state, factories) {
      state.factories = factories;
    },
  },
  getters: {
    factories(state) {
      return state.factories;
    },
    selectedFactory(state) {
      return state.selectedFactory;
    },
  },
};
