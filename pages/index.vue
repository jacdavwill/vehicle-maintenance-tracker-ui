<template>
<<<<<<< HEAD
  <div class="TheLogin">
    <h1>Login</h1>
    <div>
      <input v-model="username" type="text" name="username" placeholder="Username">
      <br>
      <input v-model="password" type="password" name="password" placeholder="Password">
      <br><br>
      <button @click="logIn">Log in</button>
    </div>
  </div>
</template>

<script>
import {AuthenticationState} from "../types"

const authenticationStore = namespace('authentication')

export default class Login extends Vue {
  @State auth
  @authenticationStore.Action authentication

  login = {
    username: '',
    password: ''
  }

  get password() {
    return this.index.password
  }

  get username() {
    return this.index.username
  }

  set password(password) {
    console.log('set password to ', password)
    this.index.password = password
  }

  set username(username) {
    console.log('set username to ', username)
    this.index.username = username
  }

  logIn() {
    console.log('called login')
=======
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
          <v-text-field outlined label="Email" v-model="email" />
          <v-text-field outlined label="Password" v-model="password" type="password"/>
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
      return this.$store.loading;
    }
  },
  methods: {
    async loginUser() {
      this.clearError();
      console.log("Logging in with email and password");
      this.$store.dispatch('authenticate', {"email": this.email, "password": this.password});
      this.$router.push('/vehicles');
    },
    toCreateAnAccount() {
      this.$router.push('/createAccount');
    },
    showError(errorMessage) {
      this.displayError = true;
      this.errorMessage = "Error: " + errorMessage;
    },
    clearError() {
      this.displayError = false;
      this.errorMessage = '';
    }
>>>>>>> dev
  }
}
</script>
