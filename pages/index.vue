<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <v-card>
        <v-card-title class="headline">
          Welcome to the Vehicle Maintenance Tracker
        </v-card-title>
        <v-card-text>

<p v-if="isLoggedIn">
      Logged in
    </p>
    <p v-else>
      Not Logged in
    </p>

          <p> Please login below </p>
          <label v-if="displayError" class="warning--text">
            {{errorMessage}}
          </label>
          <br>
          <v-text-field outlined label="Email" v-model="email" />
          <v-text-field outlined label="Password" v-model="password" type="password"/>
        </v-card-text>
        <v-card-actions>
          <a href="/createAccount" align="left">Don't have an account? Create one here</a>
          <v-spacer />
          <v-btn
            color="primary"
            v-on:click="loginUser()"
            :disabled="loading"
          >
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  components: {
  },
  data: () => ({
    email: '',
    password: '',
    authentication: 0,
    loading: false,
    errorMessage: '',
    displayError: false,
  }),
  computed: {
    isLoggedIn() {
      return this.$store.state.userAuthToken
    }
  },
  methods: {
    async loginUser() {
      try {
        this.clearError()
        this.loading = true
        console.log("Logging in with email and password")
        console.log("'" + this.email + "'   '" + this.password + "'")
	      this.$store.dispatch('authenticate', { email: this.email, password: 'myauthenticationtoken' })
        this.loading = false
	      this.$router.push('/vehicles')
      } catch (error) {
        console.log(error)
        this.loading = false
      }
    },
    showError(errorMessage) {
      this.displayError = true
      this.errorMessage = "Error: " + errorMessage
    },
    clearError() {
      this.displayError = false
      this.errorMessage = ''
    }
  }
}
</script>
