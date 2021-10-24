import CatLitterScrapper from '/CatLitterScrapper'

// State
export const state = () => ({
  catLitters: [],
  total_catLitters: 0,
})

// Getter
export const getters = {
  getCatLitters: (state) => () => {
    return state.catLitters
  },
}

// Mutation
export const mutations = {
  STORE_CAT_LITTERS(state, payload) {
    state.catLitters = payload.catLitters
    state.total_catLitters = payload.total_catLitters
  },
}

// Action
export const actions = {
  async getCatLitters({ commit }) {
    const data = await CatLitterScrapper.getCatLitters()
    if (data.total_catLitters) {
      commit('STORE_CAT_LITTERS', data)
      return data.catLitters
    }
  },
}
