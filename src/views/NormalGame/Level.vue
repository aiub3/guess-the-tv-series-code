<template>
  <v-row align="center" :key="$route.params.id">
    <v-col cols="12" class="text-center">
      <v-card max-width="344" class="mx-auto">
        <v-list-item
          :style="{ 'background-color': levelCompleted ? '#81C784' : 'white' }"
        >
          <v-list-item-avatar color="yellow darken-2" class="coin">{{
            userCoins
          }}</v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="headline"
              >Level {{ level }}</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
        <v-progress-circular
        indeterminate
        color="primary"
        v-if="loading"
      ></v-progress-circular>
        <template v-else-if="!levelCompleted">
          <v-img
            :src="mainPicture"
            v-if="mainPicture"
            height="194"
          ></v-img>
          <AnswerInput
            :name="name"
            @setLevelCompleted="setLevelCompleted"
            v-if="name"
          />
          <HiddenInfo
            :serie="serie"
            :mainPicture="mainPicture"
            :userCoins="userCoins"
          />
        </template>
        <v-img :src="posterPicture" class="poster_picture" v-else></v-img>
        <LevelLinks :levelIndex="level" />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
import AnswerInput from '@/components/Shared/AnswerInput.vue'
import HiddenInfo from '@/components/NormalGame/HiddenInfo.vue'
import LevelLinks from '@/components/NormalGame/LevelLinks.vue'
import serieInfoMixin from '@/mixins/SerieInfo'

export default {
  created() {
    this.fetchLevelSerie(this.$route.params.id).then((res) => {
      this.loading = false
    })
  },
  watch: {
    $route(to, from) {
      this.loading = true
      this.fetchLevelSerie(this.$route.params.id).then((res) => {
        this.levelCompleted = this.checkLevelCompleted()
        this.loading = false
      })
    }
  },
  components: {
    AnswerInput,
    HiddenInfo,
    LevelLinks
  },
  mixins: [serieInfoMixin],
  data() {
    return {
      serie: {},
      levelCompleted: this.checkLevelCompleted(),
      loading: true
    }
  },
  computed: {
    ...mapState({
      userCoins: (state) => state.user.normalGame.coins
    }),
    level() {
      return parseInt(this.$route.query.level)
    },
    mainPicture() {
      return this.serie && this.serie.pictures ? this.serie.pictures[0] : ''
    }
  },
  methods: {
    checkLevelCompleted() {
      return (
        this.$store.state.user.normalGame.levelsCompleted.indexOf(
          parseInt(this.$route.params.id)
        ) > -1
      )
    },
    setLevelCompleted() {
      this.levelCompleted = true
      this.$store.dispatch('levelCompleted', this.$route.params.id)
    }
  }
}
</script>

<style>
.coin {
  color: white;
}

.poster_picture .v-image__image {
  background-size: contain;
}
</style>
