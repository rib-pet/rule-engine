const state = {
  productList: []
};

const mutations = {
  UPDATE_PRODUCTS: (state, data) => {
    state.productList = data;
  }
};

const actions = {
  updateProducts({ commit }, index) {
    commit("UPDATE_PRODUCTS", index);
  }
};

const getters = {
  productList: state => state.productList
};

export default {
  state,
  mutations,
  actions,
  getters
};
