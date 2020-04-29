import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { checkAuthChange } from '@/services/Firebase'
import config from '@/generalConfig/NormalGameConfig'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
  created() {
    this.$store.dispatch('fetchTopSeries', {
      firstPage: config.FIRST_PAGE_TOP_SERIES,
      lastPage: config.LAST_PAGE_TOP_SERIES
    })
    checkAuthChange((user) => {
      if (user) {
        this.$store.dispatch('loadUser', user.uid)
      }
    })
  }
}).$mount('#app')
