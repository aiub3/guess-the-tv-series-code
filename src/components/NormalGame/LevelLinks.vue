<template>
  <v-card-actions>
    <v-btn
      text
      color="indigo darken-4"
      :to="prevLevelLink"
      v-if="prevLevelLink"
    >
      Prev Lvl
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn
      text
      color="indigo darken-4"
      to="/normal-game"
      exact
    >
      Lvl menu
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn
      text
      color="indigo darken-4"
      :to="nextLevelLink"
      v-if="nextLevelLink"
    >
      Next Lvl
    </v-btn>
  </v-card-actions>
</template>

<script>
export default {
  props: {
    levelIndex: {
      type: Number,
      required: true
    }
  },
  computed: {
    prevLevelLink() {
      const prevLevelIndex = this.levelIndex - 1
      if (prevLevelIndex < 0) {
        return ''
      }
      return this.getLevelLink(prevLevelIndex)
    },
    nextLevelLink() {
      const nextLevelIndex = this.levelIndex + 1
      if (nextLevelIndex >= this.$store.state.topSeries.series.length) {
        return ''
      }
      return this.getLevelLink(nextLevelIndex)
    }
  },
  methods: {
    getLevelLink(levelIndex) {
      const targetLevel = this.$store.state.topSeries.series[levelIndex]
      const targetLevelId = targetLevel.id
      return `/normal-game/${targetLevelId}?level=${levelIndex}`
    }
  }
}
</script>
