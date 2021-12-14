import UnitService from "../../services/Unit";
const initialState = {
  units: [],
};
export const unit = {
  namespaced: true,
  state: initialState,
  actions: {
    async getUnits({ commit }, factoryId) {
      const response = await UnitService.getByFactoryId(factoryId);
      commit("setUnits", response);
    },
  },
  mutations: {
    setUnits(state, units) {
      state.units = units;
    },
  },
  getters: {
    units: (state) => state.units,
  },
};
