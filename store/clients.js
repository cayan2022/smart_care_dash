export const state = () => ({
  client: {},
  clients: [],
  meta: {},
  searchResult: [],
  search: false,
});

export const getters = {
  clients(state) {
    return state.clients;
  },
  meta(state) {
    return state.meta;
  },
  client(state) {
    return state.client;
  },

  searchResult(state) {
    return state.searchResult;
  },
};

export const mutations = {
  setClients(state, arr) {
    const newArr = arr.map((x) => ({
      ...x,
      dropList: false,
    }));
    state.clients = newArr;
  },
  setClient(state, item) {
    state.client = item;
  },
  setMeta(state, meta) {
    state.meta = meta;
  },
  setSearchResult(state, arr) {
    const newArr = arr.map((x) => ({
      ...x,
      dropList: false,
    }));
    state.searchResult = newArr;
  },
  searchOn(state) {
    state.search = !state.search;
  },
};

const url = "dashboard/profile";

export const actions = {
  async getClients({ commit }, payload) {
    const res = await this.$axios.$get(`${url}/all?page=${payload}`);
    commit("setClients", res.data);
    commit("setMeta", res.meta);
    return res.data;
  },
  async getClient({ commit }, payload) {
    const res = await this.$axios.$get(`${url}/show/${payload}`);
    commit("setClient", res.data);
    return res.data;
  },
  async searchClients({ commit }, payload) {
    const res = await this.$axios.$get(`${url}/all?name=${payload}`);
    commit("setClients", res.data);
    commit("setMeta", res.meta);
    return res.data;
  },
};
