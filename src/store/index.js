import Vue from "vue";
import Vuex from "vuex";
import app from "./modules/app";
import catalog from "./modules/catalog";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    app,
    catalog
  }
});
