import {
  CRM_POST,
  CRM_RESET,
  com_CRM_POST,
  com_CRM_RESET,
} from "../actions/crm";

const state = {
  currentCrm: {},
};

const getters = {
  getCurrentCrm: (state) => state.currentCrm,
};

const actions = {
  [CRM_RESET]: ({ commit }) => {
    commit(com_CRM_RESET);
  },
  [CRM_POST]: ({ commit }, payload) => {
    commit(com_CRM_RESET);
    commit(com_CRM_POST, payload);
  },
};

const mutations = {
  [com_CRM_RESET]: (state) => {
    state.currentCrm = {};
  },
  [com_CRM_POST]: (state, payload) => {
    state.currentCrm = payload;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
