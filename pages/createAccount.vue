<template>
  <v-layout column justify-center align-center>
    <v-card>
      <v-card-title>
        <span class="headline">User Profile</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row v-if="displayError" class="warning--text">
            <v-col>
              <label>{{ errorMessage }}</label>
            </v-col>
          </v-row>
          <v-row>
            <v-form ref="form" v-model="valid" v-on:keyup.enter="submit">
              <v-col>
                <v-text-field label="Display name" required v-model="displayName"></v-text-field>
              </v-col>
              <v-col>
                <v-text-field label="Phone number" required v-model="phoneInput" :rules="phoneRules"></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  label="Email"
                  required
                  v-model="email"
                  :rules="emailRules"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field label="Password" required v-model="password" type="password"></v-text-field>
              </v-col>
              <v-col>
                <v-text-field label="Confirm password" required v-model="confirmPassword" type="password" @keyup.enter="createAccount"></v-text-field>
              </v-col>
            </v-form>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn :disabled="isLoading" v-on:click="toLogin()">
          Cancel
        </v-btn>
        <v-btn v-on:click="createAccount()" color="secondary" :disabled="isLoading || !valid">
          Create Account
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  components: {},
  data: () => ({
    email: '',
    displayName: '',
    phoneInput: '', //phone input by user (may include parentheses, spaces, and dashes)
    password: '',
    confirmPassword: '',
    errorMessage: '',
    displayError: false,
    valid: true,
    phoneRules: [
      v => !!v || 'Phone number is required',
      v => {
        let parsedPhone = v.replace(/\(|\)|-| /g, ''); //replace '/' '-' and ' ' with ''
        return (parsedPhone.length == 10 && !parsedPhone.match(/[^0-9]/g)) || 'Invalid phone number';
      }
    ],
    emailRules: [
                  v => !!v || 'Email is required',
                  v => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'Invalid email address' ]
  }),
  computed: {
    isLoading: function() {
      return this.$store.state.loading
    }
  },
  methods: {
    async createAccount() {
      try {
        this.clearError()
        if (this.password != this.confirmPassword) {
          this.showError('Passwords do not match')
          return
        }
        // TODO: make api call and parse response
        await this.$store.dispatch('createAccount', {
          email: this.email,
          password: this.password,
          displayName: this.displayName,
          phone: this.parsedPhone()
        })
        // TODO: notify user that account was successfully created and they will be redirected to the login page
        this.$router.push('/vehicles')
      } catch (error) {
        console.log(error)
        this.showError(error)
      }
    },
    parsedPhone: function() {
      return this.phoneInput.replace(/\(|\)|-| /g, '') //replace '/' '-' and ' ' with ''
    },
    checkPhone: function() {
      let valid = this.parsedPhone().length == 10 && !this.parsedPhone().match(/[^0-9]/g) //assumes american phone number, dosen't include country code.
      if (!valid) {
        this.showError('Invalid phone number')
      } else {
        this.clearError()
      }
      return valid
    },
    toLogin() {
      this.$router.push('/')
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
