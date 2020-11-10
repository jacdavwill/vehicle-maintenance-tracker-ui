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
                label="Display name"
                required
                v-model="displayName"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                label="Phone number - e.g. (951) 123-4567"
                required
                v-model="phoneInput"
                v-on:change="checkPhone"
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
      displayName: '',
      phoneInput: '', //phone input by user (may include parentheses, spaces, and dashes)
      password: '',
      confirmPassword:'',
      errorMessage: '',
      displayError: false,
    }),
    computed: {
      isLoading: function () {
        return this.$store.state.loading
      }
    },
    methods: {
      async createAccount() {
        try {
          this.clearError()
          if(!this.password || !this.confirmPassword || !this.email || !this.displayName || !this.phoneInput) {
            this.showError("Please complete all fields")
            return
          }
          if(this.password != this.confirmPassword) {
            this.showError("Passwords do not match");
            return
           }
          if(!this.checkPhone) {
            return
          }
          // TODO: make api call and parse response
          await this.$store.dispatch('createAccount', {"email": this.email, "password": this.password, "displayName": this.displayName, "phone": this.parsedPhone});
          // TODO: notify user that account was successfully created and they will be redirected to the login page
          this.$router.push('/vehicles');
        } catch (error) {
          console.log(error);
          this.showError(error);
          // TODO: notify user that account was not created and why
        }
      },
      parsedPhone: function () {
        return this.phoneInput.replace(/\(|\)|-| /g, '') //replace '/' '-' and ' ' with ''
      },
      checkPhone: function () {
        let valid = this.parsedPhone().length == 10 && !this.parsedPhone().match(/[^0-9]/g) //assumes american phone number, dosen't include country code.
        if(!valid) {
          this.showError("Invalid phone number")
        } else {
          this.clearError()
        }
        return valid
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
