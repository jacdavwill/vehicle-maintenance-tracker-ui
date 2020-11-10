<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-card>
      <v-card-title>
        <span class="headline">User Profile</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row v-if="displayError" class="warning--text">
            <v-col>
              <label>{{errorMessage}}</label>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                label="First name"
                required
                v-model="firstName"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                label="Last name"
                required
                v-model="lastName"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                label="Email"
                required
                v-model="email"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                label="Password"
                required
                v-model="password"
                type="password"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                label="Confirm password"
                required
                v-model="confirmPassword"
                type="password"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn
          :disabled="isLoading"
          v-on:click="toLogin()">
          Cancel
        </v-btn>
        <v-btn
          v-on:click="createAccount()"
          color="secondary"
          :disabled="isLoading">
          Create Account
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

<script>
  export default {
    components: {
    },
    data: () => ({
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword:'',
      errorMessage: '',
      displayError: false,
    }),
    computed: {
      isLoading() {
        return this.$store.state.loading
      }
    },
    methods: {
      async createAccount() {
        try {
          this.clearError()
          if(!this.password || !this.confirmPassword || !this.email || !this.firstName || !this.lastName) {
            this.showError("Please complete all fields")
            return
          }
          if(this.password != this.confirmPassword) {
            this.showError("Passwords do not match");
            return
           }
          // TODO: make api call and parse response
          await this.$store.dispatch('createAccount', {"email": this.email, "password": this.password, "firstName": this.firstName, "lastName": this.lastName});
          // TODO: notify user that account was successfully created and they will be redirected to the login page
          this.$router.push('/vehicles');
        } catch (error) {
          console.log(error);
          this.showError(error);
          // TODO: notify user that account was not created and why
        }
      },
      toLogin() {
        this.$router.push('/');
      },
      showError(errorMessage) {
        this.displayError = true;
        this.errorMessage = "Error: " + errorMessage;
      },
      clearError() {
        this.displayError = false;
        this.errorMessage = '';
      }
    }
  }
</script>
