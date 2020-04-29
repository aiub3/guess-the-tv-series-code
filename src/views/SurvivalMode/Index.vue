<template>
  <v-row align="center">
    <v-row v-show="showModes">
      <v-col cols="12" class="text-center">
        <h3 class="title font-italic font-weight-light">Survival mode</h3>
        <p>You have to guess all the series you can, you have 30 seconds for each one</p>
      </v-col>
      <v-col cols="12" class="text-center">
        <h4 class="title font-italic font-weight-light">Select difficulty</h4>
        <div
          v-for="level in difficultyLevels"
          :key="level.id">
          <v-btn class="ma-2"
          :class="[level.color, {'level_selected': level.selected}]"
          @click="selectDifficulty(level.id)">{{ level.name }}</v-btn>
          <p v-show="level.selected">{{ level.description }}</p>
        </div>
      </v-col>
      <v-col cols="12" class="text-center">
        <h4 class="title font-italic font-weight-light">Select mode</h4>
        <div
          v-for="mode in modeOptions"
          :key="mode.id">
          <v-btn class="ma-2"
          :class="[mode.color, {'level_selected': mode.selected}]" dark
          @click="selectMode(mode.id)">{{ mode.name }}</v-btn>
          <p v-show="mode.selected">{{ mode.description }}</p>
        </div>
      </v-col>
      <v-col cols="12" class="text-center">
        <h4 class="title font-italic font-weight-light">Select the both options and start de game</h4>
          <v-btn rounded color="primary"
            class="ma-2"
            :disabled="!activeButton"
            :to="gameRoute">Start</v-btn>
      </v-col>
    </v-row>
    <router-view></router-view>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      difficultyLevels: [
        {
          id: 1,
          name: 'Medium',
          url: 'medium',
          description: 'The most popular TV series',
          color: 'success',
          selected: false
        },
        {
          id: 2,
          name: 'Difficult',
          url: 'difficult',
          description: 'TV series less known',
          color: 'primary',
          selected: false
        },
        {
          id: 3,
          name: 'Impossible',
          url: 'impossible',
          description:
            'The most popular TV series, but if you fail they will dance with your tomb. Turn up the volume to feel the fear',
          color: 'error',
          selected: false
        }
      ],
      modeOptions: [
        {
          id: 102,
          name: 'Picture and description',
          url: 'picture-description',
          description: 'You can see the both',
          color: 'success',
          selected: false
        },
        {
          id: 101,
          name: 'Description',
          url: 'description',
          description: 'Guess the serie with a description',
          color: 'primary',
          selected: false
        },
        {
          id: 100,
          name: 'Picture',
          url: 'picture',
          description: 'Guess the serie like the normal mode, with a picture',
          color: 'error',
          selected: false
        }
      ],
      difficultySelected: '',
      modeSelected: ''
    }
  },
  computed: {
    activeButton() {
      return Boolean(this.difficultySelected && this.modeSelected)
    },
    gameRoute() {
      return `/survival-mode/${this.difficultySelected}?mode=${this.modeSelected}`
    },
    showModes() {
      return this.$route.name === 'Survival mode'
    }
  },
  methods: {
    selectDifficulty(id) {
      this.difficultyLevels.forEach((level) => {
        level.selected = false
      })
      const levelSelected = this.difficultyLevels.filter((level) => {
        return level.id === id
      })[0]
      levelSelected.selected = true
      this.difficultySelected = levelSelected.url
    },
    selectMode(id) {
      this.modeOptions.forEach((mode) => {
        mode.selected = false
      })
      const optionSelected = this.modeOptions.filter((mode) => {
        return mode.id === id
      })[0]
      optionSelected.selected = true
      this.modeSelected = optionSelected.url
    }
  }
}
</script>

<style scopred>
.level_selected {
  transform: scale(1.2);
}
</style>
