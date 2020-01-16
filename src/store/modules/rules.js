const state = {
  ruleList: []
};

const mutations = {
  UPDATE_RULES: (state, data) => {
    state.ruleList = data;
  }
};

const actions = {
  updateRules({ commit }, index) {
    commit("UPDATE_RULES", index);
  }
};

const getters = {
  ruleList: state => state.ruleList
};

export default {
  state,
  mutations,
  actions,
  getters
};
