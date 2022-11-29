export const state = () => ({
  countries: [],
});

export const getters = {
  countries(state) {
    return state.countries;
  },
};

export const mutations = {
  setCountries(state, arr) {
    const newArr = arr.map((x) => ({
      ...x,
    }));
    state.countries = newArr;
  },
};

const url = "dashboard/pages";

export const actions = {
  async getCountries({ commit }) {
    const res = await this.$axios.$get(`${url}/countries`);
    commit("setCountries", res.data);
    return res.data;
  },
};
