<template>
  <v-app>
    <TheNavbar />
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import TheNavbar from '@/components/TheNavbar.vue'

export default {
  name: 'App',
  components: {
    TheNavbar
  },
  data: () => ({
    //
  })
}
</script>

<style>
.v-content__wrap .row {
  margin-left: 0;
  margin-right: 0;
}
</style>
