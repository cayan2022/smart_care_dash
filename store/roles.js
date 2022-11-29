export const state = () => ({
  roles: [],
  permissions: [],
});

export const mutations = {
  setRoles(state, arr) {
    const newArr = arr.map((x) => ({
      ...x,
    }));
    state.roles = newArr;
  },
  SET_PERMISSIONS(state, payload) {
    state.permissions = payload;
  },
};

const url = "dashboard/roles";

export const actions = {
  async getRoles({ commit }) {
    const res = await this.$axios.$get(`${url}`);
    commit("setRoles", res.data);
    return res.data;
  },
  async getPermissions({ commit }) {
    const res = await this.$axios.get("dashboard/permissions/user");
    const { data } = res;
    commit(
      "SET_PERMISSIONS",
      data.map((per) => per.replaceAll(" ", "_"))
    );
    return Promise.resolve(data);
  },
};
export const getters = {
  roles(state) {
    return state.roles;
  },
  getUserPermissions(state) {
    return state.permissions;
  },
};
