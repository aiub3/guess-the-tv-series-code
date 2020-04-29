<template>
  <v-row align="center" justify="center">
    <v-col cols="8">
      <v-text-field
        v-model="userAnswer"
        :label="label"
        :hint="hint"
        :single-line="singleLine"
        :clearable="clearable"
        :persistent-hint="persistentHint"
        :counter="counter"
        @input="checkAnswer"
        :error="inputError"
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      userAnswer: '',
      label: 'Your answer',
      hint: '',
      singleLine: true,
      clearable: true,
      persistentHint: false,
      inputError: false
    }
  },
  computed: {
    counter() {
      return this.name.length
    }
  },
  methods: {
    checkAnswer(value) {
      const lowerValue = value.toLowerCase()
      const lowerName = this.name.toLowerCase()
      const diff = this.findDiff(lowerValue, lowerName)
      if (diff.length > 0 && diff.length <= 3) {
        this.hint = 'You almost have it'
      } else {
        this.hint = ''
      }
      if (value.length >= this.counter) {
        if (lowerValue === lowerName) {
          this.$emit('setLevelCompleted')
        } else {
          this.inputError = true
        }
      } else {
        this.inputError = false
      }
    },
    findDiff(str1, str2) {
      let diff = ''
      str2.split('').forEach(function(val, i) {
        if (val !== str1.charAt(i)) diff += val
      })
      return diff
    }
  }
}
</script>

<style>
</style>
