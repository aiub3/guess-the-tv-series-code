import SeriesServices from '@/services/SeriesServices.js'

export default {
  computed: {
    posterPicture() {
      return this.serie ? this.serie.image_path : ''
    },
    name() {
      return this.serie ? this.serie.name : ''
    },
    description() {
      const desc = this.serie ? this.serie.description : ''
      try {
        return desc.replace(new RegExp(this.name, 'gi'), '<b>???</b>')
      } catch (error) {
        return desc
      }
    }
  },
  methods: {
    fetchLevelSerie(id) {
      return SeriesServices.getLevelSerie(id)
        .then((response) => {
          this.serie = response.data.tvShow
        })
        .catch((err) => {
          console.log(
            `Error getting level serie with id ${id}. Error info: ${err}`
          )
        })
    }
  }
}
