const state = {
  isExpand: true
};

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.isExpand = !state.isExpand;
  }
};

const actions = {
  toggleSideBar({ commit }) {
    commit("TOGGLE_SIDEBAR");
  }
};

export default {
  state,
  mutations,
  actions
};
