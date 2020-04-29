import Vue from 'vue'
import Vuex from 'vuex'
import topSeries from './TopSeries'
import user from './User'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    topSeries,
    user
  }
})
