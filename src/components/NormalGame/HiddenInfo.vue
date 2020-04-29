<template>
  <div>
    <div
      v-for="(element, index) in hiddenInfo"
      :key="index"
      class="pa-2"
    >
      <span>{{ element.name }}: </span>
      <v-btn small color="indigo" dark
      v-if="!element.show"
      @click="showHiddenInfo(index)"
        >Show ({{ element.price }} coins)</v-btn
      >
      <div v-else>
        <div v-if="element.type === 'picture'">
          <v-img :src="element.value" height="194" class="mt-2"></v-img>
        </div>
        <div v-else-if="element.type === 'html'">
          <v-card-text v-html="element.value"></v-card-text>
        </div>
        <span v-else>{{ element.value }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import config from '@/generalConfig/NormalGameConfig'
import serieInfoMixin from '@/mixins/SerieInfo'

export default {
  props: {
    serie: {
      type: Object,
      required: true,
      default: () => {
        return {}
      }
    },
    mainPicture: {
      type: String,
      default: ''
    },
    userCoins: {
      type: Number,
      required: true
    }
  },
  mixins: [serieInfoMixin],
  computed: {
    name() {
      return this.serie ? this.serie.name : ''
    },
    secondaryPicture() {
      return this.serie && this.serie.pictures && this.serie.pictures.length > 1
        ? this.serie.pictures[1]
        : ''
    },
    network() {
      return this.serie ? this.serie.network : ''
    },
    startDate() {
      return this.serie ? this.serie.start_date : ''
    },
    genders() {
      return this.serie && this.serie.genres ? this.serie.genres.join('-') : ''
    },
    country() {
      return this.serie ? this.serie.country : ''
    },
    hiddenInfo() {
      const info = [
        {
          name: 'Secondary picture',
          value: this.secondaryPicture,
          price: config.SECOND_PICTURE_PRICE,
          type: 'picture',
          show: false
        },
        {
          name: 'Network',
          value: this.network,
          price: config.NETWORK_PRICE,
          type: 'text',
          show: false
        },
        {
          name: 'Start date',
          value: this.startDate,
          price: config.START_DATE_PRICE,
          type: 'text',
          show: false
        },
        {
          name: 'Genders',
          value: this.genders,
          price: config.GENDRES_PRICE,
          type: 'text',
          show: false
        },
        {
          name: 'Country',
          value: this.country,
          price: config.COUNTRY_PRICE,
          type: 'text',
          show: false
        },
        {
          name: 'Description',
          value: this.description,
          price: config.DESCRIPTION_PRICE,
          type: 'html',
          show: !this.mainPicture
        }
      ]
      return info.filter((element) => {
        return element.value
      })
    }
  },
  methods: {
    showHiddenInfo(index) {
      const targetInfo = this.hiddenInfo[index]
      if (this.userCoins < targetInfo.price) {
        alert('You dont have enough coins')
        return
      }
      this.$set(targetInfo, 'show', true)
      this.$set(this.hiddenInfo, index, targetInfo)

      this.$store.commit('REMOVE_COINS', targetInfo.price)
      this.$forceUpdate()
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
