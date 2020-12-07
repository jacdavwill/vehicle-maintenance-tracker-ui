<template>
  <v-layout column justify-center align-center>
    <v-card>
      <v-card-title>
        Request Password Reset
      </v-card-title>
      <v-card-text>
        <v-container>
          <p>Enter the email address associated with your account and we will send you a password reset link.</p>
          <v-form ref="form" v-model="valid">
            <v-text-field
              label="Email"
              required
              v-model="email"
              :rules="emailRules"
              autofocus
              @keyup.enter="requestReset"
            ></v-text-field>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn v-on:click="toLogin()">
          Cancel
        </v-btn>
        <v-btn v-on:click="requestReset()" color="secondary" :disabled="!valid">
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    email: '',
    valid: true,
    emailRules: [
      v => !!v || 'Email is required',
      v =>
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || 'Invalid email address'
    ]
  }),
  methods: {
    toLogin() {
      this.$router.push('/')
    },
    async requestReset() {
      await this.$store.dispatch('requestReset', this.email)
      this.toLogin()
    }
  }
}
</script>
