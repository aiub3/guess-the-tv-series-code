<template>
  <v-row align="center" :key="$route.params.id">
    <v-col cols="12" class="text-center">
      <v-card max-width="344" class="mx-auto">
        <v-list-item
          :style="{
            'background-color': levelCompleted ? levelCompletedColor : 'white'
          }"
        >
          <v-list-item-avatar color="blue-grey lighten-4" class="coin">{{
            hits
          }}</v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="headline"
              >Level {{ hits }}</v-list-item-title
            >
          </v-list-item-content>
          <span><v-icon medium>mdi-alarm</v-icon> {{ timer }}</span>
        </v-list-item>
        <v-progress-circular
          indeterminate
          color="primary"
          v-if="loading"
        ></v-progress-circular>
        <template v-else>
          <ImpossibleExtras
            :timer="timer"
            :startAudio="startAudio"
            :finishedGame="finishedGame"
            v-if="impossibleMode"
          />
          <template v-if="!levelCompleted">
            <v-img :src="mainPicture" v-if="mainPicture" height="194"></v-img>
            <AnswerInput
              :name="name"
              @setLevelCompleted="finishLevel('success')"
              v-if="name"
            />
            <v-card-text
              v-html="description"
              v-if="description && mode !== 'picture'"
            ></v-card-text>
          </template>
          <v-img :src="posterPicture" class="poster_picture" v-else></v-img>
        </template>
      </v-card>
    </v-col>
    <v-col cols="12" class="text-center" v-if="levelCompleted && !finishedGame">
      <v-btn rounded color="success" class="ma-2" @click="getRandomSerie"
        >Next</v-btn
      >
    </v-col>
    <v-col cols="12" class="text-center" v-if="!finishedGame && name">
      <v-btn rounded color="error" class="ma-2" @click="finishLevel"
        >Finish game</v-btn
      >
    </v-col>
    <v-col cols="12" class="text-center" v-else>
      <v-btn rounded color="success" class="ma-2" @click="restartGame"
        >Restart</v-btn
      >
      <v-btn rounded color="primary" class="ma-2" to="/survival-mode"
        >Back to options</v-btn
      >
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import config from '@/generalConfig/SurvivalModeConfig'
import SeriesServices from '@/services/SeriesServices.js'
import AnswerInput from '@/components/Shared/AnswerInput.vue'
import ImpossibleExtras from '@/components/SurvivalMode/ImpossibleExtras.vue'
import serieInfoMixin from '@/mixins/SerieInfo'

export default {
  mounted() {
    this.setSeries()
  },
  components: {
    AnswerInput,
    ImpossibleExtras
  },
  mixins: [serieInfoMixin],
  data() {
    return {
      series: this.$store.state.topSeries.series.length
        ? this.$store.state.topSeries.series
        : [],
      serie: {},
      hits: 0,
      completedIndexes: [],
      timer: config.INTERVAL_SECONDS,
      intervalFunction: '',
      startAudio: false,
      levelCompleted: false,
      levelCompletedColor: '#81C784',
      finishedGame: false,
      loading: true
    }
  },
  computed: {
    ...mapState({
      topSeries: (state) => state.topSeries.series
    }),
    difficulty() {
      return this.$route.params.difficulty
    },
    mode() {
      return this.$route.query.mode
    },
    mainPicture() {
      return this.mode !== 'description' &&
        this.serie &&
        this.serie.pictures.length
        ? this.serie.pictures[this.serie.pictures.length - 1]
        : ''
    },
    impossibleMode() {
      return this.difficulty === 'impossible'
    }
  },
  watch: {
    $route(to, from) {
      this.setSeries()
    },
    topSeries(newValue) {
      this.series = newValue
    },
    series(newValue) {
      if (newValue.length && !this.serie.id) {
        this.getRandomSerie()
      }
    },
    serie(newVal) {
      if (!newVal || !newVal.pictures || newVal.id) {
      } else if (
        (this.mode === 'picture' && !newVal.pictures.length) ||
        (this.mode === 'description' && !newVal.description) ||
        (this.mode !== 'picture' &&
          this.mode !== 'description' &&
          !newVal.pictures.length) ||
        !newVal.description
      ) {
        this.getRandomSerie()
      }
    }
  },
  methods: {
    ...mapActions(['saveSurvivalMode']),
    setSeries() {
      if (this.difficulty === 'difficult') {
        this.series = []
        this.fetchSeries(
          config.DIFFICULT_FIRST_PAGE,
          config.DIFFICULT_LAST_PAGE
        )
      } else {
        if (this.series.length) {
          this.getRandomSerie()
        }
      }
    },
    async fetchSeries(firstPage, lastPage) {
      for (let i = firstPage; i <= lastPage; i++) {
        await SeriesServices.getTopSeries(i)
          .then((response) => {
            this.series = this.series.concat(response.data.tv_shows)
            if (!this.serie || (this.serie && !this.serie.name)) {
              this.getRandomSerie()
            }
          })
          .catch((err) => {
            console.log(
              `Error getting Top series from page ${i}. Error info: ${err}`
            )
          })
      }
    },
    getRandomSerie() {
      this.timer = config.INTERVAL_SECONDS
      this.levelCompleted = false
      this.loading = true
      const randomIndex = this.generateRandomNumber(
        0,
        this.series.length,
        this.completedIndexes
      )
      this.completedIndexes.push(randomIndex)
      const serieId = this.series[randomIndex].id
      this.serie = this.fetchLevelSerie(serieId).then((res) => {
        this.loading = false
      })
      if (!this.intervalFunction) {
        this.startTimer()
      }
    },
    startTimer() {
      this.startAudio = true
      this.intervalFunction = setInterval(() => {
        this.timer--
        if (this.timer === 0) {
          this.finishLevel()
        }
      }, 1000)
    },
    generateRandomNumber(min, max, except) {
      const rndNumber = Math.round(Math.random() * (max - min)) + min
      if (except.indexOf(rndNumber) > -1) {
        return this.generateRandomNumber(min, max, except)
      }
      return rndNumber
    },
    finishLevel(result = 'failed') {
      clearInterval(this.intervalFunction)
      this.intervalFunction = ''
      this.levelCompleted = true
      this.startAudio = false
      if (result === 'success') {
        this.setLevelSuccesful()
      } else {
        this.setLevelFailed()
      }
    },
    setLevelSuccesful() {
      this.hits++
      this.levelCompletedColor = '#81C784'
    },
    setLevelFailed() {
      this.levelCompletedColor = '#EF5350'
      this.finishedGame = true
      const gameInfo = {
        points: this.hits,
        difficulty: this.difficulty,
        mode: this.mode
      }
      this.saveSurvivalMode(gameInfo)
    },
    restartGame() {
      this.hits = 0
      this.completedIndexes = []
      this.finishedGame = false
      this.getRandomSerie()
    }
  }
}
</script>
