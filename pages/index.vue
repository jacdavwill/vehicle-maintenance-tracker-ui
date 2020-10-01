<template>
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
  }
}
</script>
