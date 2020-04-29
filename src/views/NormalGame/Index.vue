<template>
  <v-row align="center">
    <v-col cols="12" class="text-center" v-show="showLevels">
      <h3 class="title font-italic font-weight-light">Levels</h3>
      <v-btn
        class="ma-2 level_button"
        outlined
        color="indigo darken-4"
        v-for="(level, index) in series"
        :key="level.id + Math.random()"
        :class="{ success: level.isCompleted }"
        :to="'/normal-game/' + level.id + '?level=' + index"
        >Level {{ index }}</v-btn
      >
      <br />
      <v-progress-circular
        indeterminate
        color="primary"
        v-if="loading"
      ></v-progress-circular>
    </v-col>
    <router-view></router-view>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
  mounted() {
    this.setListLevels()
  },
  data() {
    return {
      series: []
    }
  },
  computed: {
    showLevels() {
      return Boolean(this.$route.name === 'Normal game' && this.series)
    },
    ...mapState({
      levelsCompleted: (state) => state.user.normalGame.levelsCompleted,
      topSeries: (state) => state.topSeries.series,
      loading: (state) => state.topSeries.loading
    })
  },
  watch: {
    $route(to, from) {
      this.setListLevels()
    },
    topSeries(newValue) {
      this.series = newValue
    }
  },
  methods: {
    setListLevels() {
      const levels = this.topSeries.map((serie) => {
        const serieId = parseInt(serie.id)
        if (this.levelsCompleted.indexOf(serieId) > -1) {
          serie.isCompleted = true
        } else {
          serie.isCompleted = false
        }
        return serie
      })
      this.series = levels
    }
  }
}
</script>

<style scoped>
.level_button {
  width: 114px;
}

.level_button.success {
  color: white !important;
}
</style>
