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
                label="First and last name"
                required
                v-model="name"
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
        <form action="/">
          <v-btn
            type="submit"
            :disabled="loading">
            Cancel
          </v-btn>
        </form>
        <v-btn
          v-on:click="createAccount()"
          color="secondary"
          :disabled="loading">
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
      name: '',
      password: '',
      confirmPassword:'',
      loading: false,
      errorMessage: '',
      displayError: false,
    }),
    methods: {
      async createAccount() {
        try {
          this.loading = true;
          console.log("Creating account");
          if(this.password != this.confirmPassword) {
            this.showError("Passwords do not match");
            this.loading = false;
            return
           }
          // TODO: make api call and parse response
          //const response = await axios.get(url + '/login'); // API CALL. Missing stuff
          this.loading = false;
          // TODO: notify user that account was successfully created and they will be redirected to the login page

          window.location.href = '/';
        } catch (error) {
          console.log(error);
          this.loading = false;
          // TODO: notify user that account was not created and why
        }
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
