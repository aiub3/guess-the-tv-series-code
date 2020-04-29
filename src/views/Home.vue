<template>
  <v-row align="center">
    <v-col cols="12" class="text-center">
      <h3 class="title font-italic font-weight-light">Main menu</h3>
      <div class="my-2" v-if="!userIsAuth">
        <v-btn x-large dark color="primary" to="/login">Log in</v-btn>
      </div>
      <div class="my-2" v-else>
        <v-btn x-large dark color="error" @click="logout">Log out</v-btn>
      </div>
      <div class="my-2">
        <v-btn x-large dark color="success" to="/game-modes">Play</v-btn>
      </div>
      <div class="my-2">
        <v-btn x-large dark color="indigo" to="/rankings">Rankings</v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Home',
  computed: mapState({
    userIsAuth: (state) => state.user.userId
  }),
  methods: mapActions(['logout'])
}
</script>
