// export const state = () => ({
//   loading: false,

//   nav: false,

//   assets: {},
// })

// export const mutations = {
//   loading: (state, loading) => { state.loading = loading },

//   nav: (state, bool) => { state.nav = bool },

//   assets: (state, assets) => { state.assets = assets },

//   service: (state, service) => { state.service = service }
// }

// export const actions = {
//   assets({ commit }, payload) {
//     return this.$axios.$post(`home/assets`, payload).then(ok => {
//       commit('assets', ok.data)
//       return ok.data
//     }).catch(() => false)
//   },

//   register({ commit }, payload) {
//     return this.$axios.$post(`lead/register`, payload).then(ok => {
//       return ok
//     }).catch(() => false)
//   }
// }
