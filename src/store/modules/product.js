const state = {
  productList: [],
  productRuleList: []
};

const mutations = {
  UPDATE_PRODUCTS: (state, data) => {
    state.productList = data;
  },
  UPDATE_PRODUCT_RULE: (state, { index, data }) => {
    state.productRuleList.splice(index, 1, data);
  },
  ADD_PRODUCT_RULE: (state, data) => {
    state.productRuleList.push(data);
  },
  DEL_PRODUCT_RULE: (state, index) => {
    state.productRuleList.splice(index);
  }
};

const actions = {
  updateProducts({ commit }, data) {
    commit("UPDATE_PRODUCTS", data);
  },
  updateProductRule({ commit, state }, data) {
    let index = state.productRuleList.findIndex(
      item => item.code === data.code
    );
    if (index !== -1) {
      commit("UPDATE_PRODUCT_RULE", { index, data });
    } else {
      commit("ADD_PRODUCT_RULE", data);
    }
  },
  deleteProductRule({ commit }, index) {
    commit("DEL_PRODUCT_RULE", index);
  }
};

const getters = {
  productList: state => state.productList,
  productRuleList: (state, getters) =>
    state.productRuleList.map(item => {
      item.product = getters.productList.find(
        product => product.code === item.productCode
      );
      item.rule = getters.ruleList.find(rule => rule.code === item.ruleCode);
      return item;
    })
};

export default {
  state,
  mutations,
  actions,
  getters
};
