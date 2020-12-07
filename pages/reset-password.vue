<template>
  <v-layout column justify-center align-center>
    <v-card>
      <v-card-title>
        Reset Password
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row v-if="displayError" class="warning--text">
            <v-col>
              <label>{{ errorMessage }}</label>
            </v-col>
          </v-row>
          <v-form ref="form" v-model="valid">
            <v-text-field
              label="Password"
              required
              v-model="password"
              type="password"
              @keyup.enter="resetPassword"
            ></v-text-field>
            <v-text-field
              label="Confirm password"
              required
              v-model="confirmPassword"
              type="password"
              @keyup.enter="resetPassword"
            ></v-text-field>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn v-on:click="toLogin()">
          Cancel
        </v-btn>
        <v-btn v-on:click="resetPassword()" color="secondary" :disabled="!valid">
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    password: '',
    confirmPassword: '',
    errorMessage: '',
    displayError: false
  }),
  methods: {
    toLogin() {
      this.$router.push('/')
    },
    async resetPassword() {
      try {
        this.clearError()
        if (this.password != this.confirmPassword) {
          this.showError('Passwords do not match')
          return
        }
        await this.$store.dispatch('resetPassword', {
          password: this.password,
          resetToken: this.$route.query.resetToken
        })
        this.toLogin()
      } catch (e) {}
    },
    showError(errorMessage) {
      this.displayError = true
      this.errorMessage = 'Error: ' + errorMessage
    },
    clearError() {
      this.displayError = false
      this.errorMessage = ''
    }
  }
}
</script>
