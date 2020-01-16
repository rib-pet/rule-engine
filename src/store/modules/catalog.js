const state = {
  variableCatalogs: [
    {
      code: 1,
      description: "aaaaaa",
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
          code: "max",
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
          description: "",
          formula: "issueAge >= min && issueAge <= max",
          value: "",
          type: "result",
          readonly: true
        }
      ]
    },
    {
      code: 2,
      description: "bbb",
      children: [
        {
          code: "1111",
          description: "1111",
          formula: "",
          type: "number"
        }
      ]
    }
  ]
};

const mutations = {
  UPDATE_VARIABLE: (state, data) => {
    state.variableCatalogs = data;
  }
};

const actions = {
  updateVariable({ commit }, data) {
    commit("UPDATE_VARIABLE", data);
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
