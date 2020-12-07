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

          <p> Please login below </p>
          <label v-if="displayError" class="warning--text">
            {{errorMessage}}
          </label>
          <br>
          <v-text-field outlined label="Email" v-model="email" @keyup.enter="loginUser"/>
          <v-text-field outlined label="Password" v-model="password" type="password" @keyup.enter="loginUser"/>
        </v-card-text>
        <v-card-actions>
          <a @click="toCreateAnAccount()" align="left">Don't have an account? Create one here</a>
          <v-spacer />
          <v-btn
            color="primary"
            v-on:click="loginUser()"
            :disabled="isLoading"
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
    errorMessage: '',
    displayError: false,
  }),
  computed: {
    isLoading() {
      return this.$store.state.loading
    }
  },
  methods: {
    async loginUser() {
        this.clearError();
        if(!this.email || !this.password) {
          this.showError("Please complete all fields")
          return
        }
        console.log("Logging in with email and password")
        this.$store.dispatch('authenticate', {"email": this.email, "password": this.password})
        .then( () => {
          console.log("going to vehicles page")
          this.$router.push('/vehicles')
        })
        .catch((error) => this.showError(error))
    },
    toCreateAnAccount() {
      this.$router.push('/createAccount')
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
