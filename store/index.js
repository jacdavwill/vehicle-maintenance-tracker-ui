export const state = () => ({
  isLoggedIn: false,
  email: '',
  authToken: ''
})

export const mutations = {
  loggedIn(state, email, authToken) {
    state.isLoggedIn = true;
    state.email = email;
    state.authToken = authToken;
  },
  loggedOut(state) {
    state.isLoggedIn = false;
    state.email = '';
    state.authToken = '';
  }
}