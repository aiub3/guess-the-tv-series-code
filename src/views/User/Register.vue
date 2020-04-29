<template>
  <v-card width="400" class="mx-auto mt-5">
    <v-card-title>
      <h1 class="display-1">Resgister</h1>
      <h3 class="title font-italic font-weight-light">
        Resgister to save your progress
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
      <v-form ref="registerForm">
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
          label="Name"
          type="name"
          prepend-icon="mdi-face"
          v-model="name"
          :rules="nameRules"
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
        <v-text-field
          :type="showPassword ? 'text' : 'password'"
          label="Confirm password"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          v-model="confirmPasword"
          :rules="confirmPaswordRules"
          :validate-on-blur="true"
        />
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn color="success" to="/login">Login</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="info" @click="submitForm">Resgister</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import UserFormInfo from '@/mixins/UserFormInfo'

export default {
  mixins: [UserFormInfo],
  data: () => ({
    name: '',
    nameRules: [(value) => !!value.trim() || 'Name is required'],
    confirmPasword: ''
  }),
  computed: {
    confirmPaswordRules() {
      return [
        (value) =>
          value === this.password ||
          'Password and confirm pasword should coincide'
      ]
    }
  },
  methods: {
    ...mapActions(['registerUser']),
    submitForm() {
      const formValid = this.$refs.registerForm.validate()
      if (formValid) {
        const user = {
          email: this.email,
          password: this.password,
          name: this.name
        }
        this.registerUser(user)
        this.$router.push({ name: 'Game modes' })
      }
    }
  }
}
</script>
