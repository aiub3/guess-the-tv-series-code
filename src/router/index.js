import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/User/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/User/Register.vue')
  },
  {
    path: '/game-modes',
    name: 'Game modes',
    component: () => import('@/views/GameModes.vue')
  },
  {
    path: '/rankings',
    name: 'Rankings',
    component: () => import('@/views/Rankings.vue')
  },
  {
    path: '/normal-game',
    name: 'Normal game',
    component: () => import('@/views/NormalGame/Index.vue'),
    children: [
      {
        path: ':id',
        name: 'Normal game level',
        component: () => import('@/views/NormalGame/Level.vue'),
        beforeEnter(to, from, next) {
          if (!store.state.topSeries.series.length) {
            next({ name: 'Normal game' })
          }
          next()
        }
      }
    ]
  },
  {
    path: '/survival-mode',
    name: 'Survival mode',
    component: () => import('@/views/SurvivalMode/Index.vue'),
    children: [
      {
        path: ':difficulty',
        name: 'Survival mode level',
        component: () => import('@/views/SurvivalMode/Level.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
