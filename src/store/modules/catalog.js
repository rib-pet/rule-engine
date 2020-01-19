const state = {
  variableCatalogs: [
    {
      code: "VC1",
      description: "for_product",
      children: [
        {
          code: "issueAge",
          description: "Issue Age:",
          formula: "",
          value: "",
          type: "number",
          readonly: false
        }
      ]
    },
    {
      code: "VC2",
      description: "for_rule",
      children: [
        {
          code: "minAge",
          description: "Min Age:",
          formula: "",
          value: "",
          type: "number",
          readonly: false
        },
        {
          code: "maxAge",
          description: "Max Age:",
          formula: "",
          value: "",
          type: "number",
          readonly: false
        },
        {
          code: "issueAge",
          description: "Issue Age:",
          formula: "",
          value: "",
          type: "number",
          readonly: false
        },
        {
          code: "issueAgeResult",
          description: "Result",
          formula: "issueAge >= minAge && issueAge <= maxAge",
          value: "",
          type: "result",
          readonly: true
        }
      ]
    }
  ]
};

const mutations = {
  UPDATE_VARIABLE_CATALOG: (state, data) => {
    state.variableCatalogs = data;
  }
};

const actions = {
  updateVariableCatalog({ commit }, data) {
    commit("UPDATE_VARIABLE_CATALOG", data);
  }
};

const getters = {
  variableCatalogs: state => state.variableCatalogs
};

export default {
  state,
  mutations,
  actions,
  getters
};
