<template>
  <div>
    <v-app-bar color="indigo darken-4" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>
        <v-btn text rounded to="/">Guess the TV series</v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <span>{{ userName }}</span>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group active-class="light-blue lighten-5 text--accent-4">
          <v-list-item
            v-for="(link, index) in navLinks"
            :key="index"
            :to="link.url"
          >
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ link.name }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    drawer: false,
    navLinks: [
      {
        name: 'Home',
        url: '/',
        icon: 'mdi-home'
      },
      {
        name: 'Play',
        url: '/game-modes',
        icon: 'mdi-youtube-tv'
      },
      {
        name: 'Rankings',
        url: '/rankings',
        icon: 'mdi-sort'
      }
    ]
  }),
  computed: {
    ...mapState({
      userName: (state) =>
        state.user.userName ? state.user.userName : 'Unlogged'
    })
  }
}
</script>
