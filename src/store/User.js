import * as firebaseFn from '@/services/Firebase'
import config from '@/generalConfig/NormalGameConfig'

const state = () => ({
  userId: null,
  userName: '',
  error: '',
  normalGame: {
    coins: config.USER_INITIAL_COINS,
    levelsCompleted: []
  },
  survivalMode: {
    maxPoints: 0,
    difficulty: '',
    mode: ''
  }
})
const mutations = {
  SET_USER_ID(state, id) {
    state.userId = id
  },
  SET_USER(state, user) {
    state.userId = user.id
    state.userName = user.name
    if (user.normalGame) {
      state.normalGame.coins = user.normalGame.coins
      if (user.normalGame.levelsCompleted) {
        state.normalGame.levelsCompleted = user.normalGame.levelsCompleted
      }
    }
    if (user.survivalMode) {
      state.survivalMode = user.survivalMode
    }
  },
  REMOVE_COINS(state, coins) {
    state.normalGame.coins -= coins
  },
  ADD_COINS(state, coins) {
    state.normalGame.coins += coins
  },
  ADD_LEVEL_COMPLETED(state, id) {
    state.normalGame.levelsCompleted.push(id)
  },
  SET_SURVIVAL_MODE_RECORD(state, gameInfo) {
    state.survivalMode = {
      maxPoints: gameInfo.points,
      difficulty: gameInfo.difficulty,
      mode: gameInfo.mode
    }
  },
  SET_ERROR(state, error) {
    state.error = error
  },
  CLEAR_ERROR(state) {
    state.error = ''
  }
}
const actions = {
  levelCompleted({ commit, dispatch }, id) {
    commit('ADD_COINS', config.LEVEL_COMPLETED_COINS)
    commit('ADD_LEVEL_COMPLETED', parseInt(id))
    dispatch('updateUser')
  },
  updateUser({ commit, state }) {
    const user = {
      normalGame: state.normalGame,
      survivalMode: state.survivalMode
    }
    firebaseFn
      .updateUserInDb(state.userId, user)
      .then()
      .catch((error) => commit('SET_ERROR', error.message))
  },
  registerUser({ commit, dispatch }, user) {
    firebaseFn
      .signUpUser(user)
      .then((userData) => {
        commit('CLEAR_ERROR')
        dispatch('saveUser', { userId: userData.user.uid, userName: user.name })
      })
      .catch((error) => {
        commit('SET_ERROR', error.message)
      })
  },
  saveUser({ commit, state }, { userId, userName }) {
    const user = {
      normalGame: state.normalGame,
      survivalMode: state.survivalMode,
      name: userName
    }
    firebaseFn
      .addUserToDb(userId, user)
      .then((data) => {
        commit('SET_USER_ID', userId)
      })
      .catch((error) => {
        commit('SET_ERROR', error.message)
      })
  },
  loginUser({ commit, dispatch }, user) {
    firebaseFn
      .signInUser(user)
      .then((userData) => {
        commit('CLEAR_ERROR')
        dispatch('loadUser', userData.user.uid)
      })
      .catch((error) => {
        commit('SET_ERROR', error.message)
      })
  },
  loadUser({ commit }, userId) {
    firebaseFn
      .getUserFromDb(userId)
      .then((data) => {
        const userResult = data.val()
        const user = {
          id: userId,
          name: userResult.name,
          normalGame: userResult.normalGame,
          survivalMode: userResult.survivalMode
        }
        commit('SET_USER', user)
      })
      .catch((error) => {
        commit('SET_ERROR', error.message)
      })
  },
  logout({ commit, dispatch }) {
    firebaseFn.signOutUser()
    commit('SET_USER', {
      id: null,
      name: '',
      normalGame: {
        coins: config.USER_INITIAL_COINS,
        levelsCompleted: []
      },
      survivalMode: {
        maxPoints: 0,
        difficulty: '',
        mode: ''
      }
    })
  },
  saveSurvivalMode({ commit, state, dispatch }, gameInfo) {
    if (gameInfo.points > state.survivalMode.maxPoints) {
      commit('SET_SURVIVAL_MODE_RECORD', gameInfo)
      dispatch('updateUser')
    }
  }
}

export default {
  state,
  mutations,
  actions
}
