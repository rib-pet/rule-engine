import Vue from "vue";
import Vuex from "vuex";
import app from "./modules/app";
import catalog from "./modules/catalog";
import rules from "./modules/rules";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    rules,
    app,
    catalog
  }
});
