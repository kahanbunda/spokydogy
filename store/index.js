export const actions = {
  async nuxtServerInit({ dispatch }) {
    try {
      await dispatch('catlitter/getCatLitters')
    } catch (error) {}
  },
}
