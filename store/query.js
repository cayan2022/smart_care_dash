export const state = () => ({
  query: null,
  system_logo: "",
});

export const mutations = {
  SET_QUERY(state, query) {
    state.query = { ...query };
  },
  REMOVE_QUERY(state, payload = {}) {
    state.query = payload;
  },
  SET_LOGO(state, payload) {
    state.system_logo = payload;
  },
};

export const actions = {
  removeQuery({ commit }, payload) {
    commit("REMOVE_QUERY", payload);
  },
  setQuery({ commit }, payload) {
    commit("SET_QUERY", payload);
  },
  async SetSystemLogo({ commit }) {
    const res = await this.$axios.get(`dashboard/pages/settings/1`);
    const { data } = res.data;
    commit("SET_LOGO", data);
  },
};
export const getters = {
  getQuery(state) {
    return state.query;
  },
  getSystemLogo(state) {
    return state.system_logo;
  },
};
