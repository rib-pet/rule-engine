import Vue from "vue";
import Vuex from "vuex";
import app from "./modules/app";
import catalog from "./modules/catalog";
import rules from "./modules/rules";
import product from "./modules/product";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    product,
    rules,
    app,
    catalog
  },
  plugins: [
    createPersistedState({
      key: "aia-rule-engine"
    })
  ]
});
