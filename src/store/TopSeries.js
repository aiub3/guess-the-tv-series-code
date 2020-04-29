import SeriesServices from '@/services/SeriesServices.js'

const state = () => ({
  series: [],
  loading: true
})

const mutations = {
  SET_TOP_SERIES(state, topSeries) {
    state.series = state.series.concat(topSeries)
  },
  SET_LOADING(state, value) {
    state.loading = value
  }
}

const actions = {
  async fetchTopSeries({ commit }, { firstPage, lastPage }) {
    for (let i = firstPage; i <= lastPage; i++) {
      await SeriesServices.getTopSeries(i)
        .then((response) => {
          commit('SET_TOP_SERIES', response.data.tv_shows)
          if (i === lastPage) {
            commit('SET_LOADING', false)
          }
        })
        .catch((err) => {
          console.log(
            `Error getting Top series from page ${i}. Error info: ${err}`
          )
        })
    }
  }
}

export default {
  state,
  mutations,
  actions
}
