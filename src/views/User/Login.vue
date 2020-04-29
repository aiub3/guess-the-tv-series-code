<template>
  <v-card width="360" class="mx-auto mt-5">
    <v-card-title>
      <h1 class="display-1">Login</h1>
      <h3 class="title font-italic font-weight-light">
        Login to load your progress
      </h3>
    </v-card-title>
    <v-card-text>
      <v-alert
        type="error"
        dismissible
        @input="closeErrors"
        :value="true"
        v-if="registerError"
      >
        {{ registerError }}
      </v-alert>
      <v-form ref="loginForm">
        <v-text-field
          label="Email"
          type="email"
          prepend-icon="mdi-account-circle"
          v-model="email"
          :rules="emailRules"
          :validate-on-blur="true"
          required
        />
        <v-text-field
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          v-model="password"
          :rules="passwordRules"
          :validate-on-blur="true"
        />
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn color="success" to="/register">Resgister</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="info" @click="submitForm">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import UserFormInfo from '@/mixins/UserFormInfo'

export default {
  mixins: [UserFormInfo],
  methods: {
    ...mapActions(['loginUser']),
    submitForm() {
      const formValid = this.$refs.loginForm.validate()
      if (formValid) {
        const user = {
          email: this.email,
          password: this.password
        }
        this.loginUser(user)
        this.$router.push({ name: 'Game modes' })
      }
    }
  }
}
</script>
