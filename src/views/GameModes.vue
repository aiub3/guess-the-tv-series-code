<template>
  <v-row align="center">
    <v-col cols="12" class="text-center">
      <h3 class="title font-italic font-weight-light">Select a mode</h3>
      <div class="my-2" v-for="(option, index) in gameOptions" :key="index">
        <v-btn x-large :class="[option.color]" dark :to="option.url">{{
          option.name
        }}</v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Home',

  data: () => ({
    gameOptions: [
      {
        name: 'Levels',
        url: '/normal-game',
        color: 'primary'
      },
      {
        name: 'Survival',
        url: '/survival-mode',
        color: 'error'
      }
    ]
  })
}
</script>
