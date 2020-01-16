const state = {
  variableCatalogs: [
    {
      code: 1,
      description: "Issue age ",
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
      description: "VIP Checking",
      children: [
        {
          code: "isVip",
          description: "Is Vip?",
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
