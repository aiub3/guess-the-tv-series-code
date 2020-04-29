<template>
  <div>
    <video width="320" height="240" autoplay loop controls v-if="finishedGame">
      <source
        :src="require('@/assets/video/impossible_video.mp4')"
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video>
    <img
      class="impossible_img"
      :src="require('@/assets/img/impossible_img.jpg')"
      alt="The wait for you"
      :style="{ transform: 'scale(' + impossibleImgScale + ')' }"
      v-else
    />
  </div>
</template>

<script>
import config from '@/generalConfig/SurvivalModeConfig'

export default {
  props: {
    timer: {
      type: Number,
      required: true
    },
    startAudio: {
      type: Boolean,
      default: false
    },
    finishedGame: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      audio: new Audio(require('@/assets/audio/impossible_audio.mp3'))
    }
  },
  computed: {
    impossibleImgScale() {
      return 1 - this.timer / config.INTERVAL_SECONDS
    }
  },
  watch: {
    startAudio(newVal, oldVal) {
      if (newVal) {
        this.audio.play()
      } else {
        this.audio.pause()
        this.audio.currentTime = 0
      }
    }
  },
  created() {
    this.audio.play()
  }
}
</script>

<style>
.impossible_img {
  width: 100%;
  overflow: hidden;
  transform: scale(0);
  transition: all 0.2s;
}
</style>
