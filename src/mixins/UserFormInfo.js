import { mapState } from 'vuex'

export default {
  data: () => {
    return {
      showPassword: false,
      email: '',
      password: '',
      emailRules: [
        (value) => !!value.trim() || 'Email is required',
        (value) => value.indexOf('@') > -1 || 'Email should have a @',
        (value) => value.indexOf('@') !== 0 || 'Email should have a username',
        (value) =>
          value.indexOf('.') - value.indexOf('@') > 1 ||
          'Email should have a domain',
        (value) =>
          value.indexOf('.') <= value.length - 3 ||
          'Email should have a valid domain'
      ],
      passwordRules: [
        (value) => !!value.trim() || 'Password is required',
        (value) =>
          value.trim().length >= 6 ||
          'Password should have at least 6 characters'
      ]
    }
  },
  computed: {
    ...mapState({
      registerError: (state) => state.user.error,
      userId: (state) => state.user.userId
    })
  },
  watch: {
    userId(newVal) {
      if (newVal) {
        this.$router.push({ name: 'Game modes' })
      }
    }
  },
  methods: {
    closeErrors() {
      this.$store.commit('CLEAR_ERROR')
    }
  }
}
