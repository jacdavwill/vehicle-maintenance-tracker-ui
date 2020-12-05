import { ActionTree, MutationTree } from 'vuex'
import { RootState } from '~/types'
import { NewAccount } from '~/types/newAccount.ts'
import axios from 'axios'
import Vue from 'vue'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)
Vue.$cookies.config('1h')

axios.defaults.headers.common['sessionKey'] = "lalalal"
axios.defaults.baseURL = "http://ec2-34-212-167-238.us-west-2.compute.amazonaws.com:8080/api/"

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

export const state = (): RootState => ({
  loading: false,
  userAuthToken: undefined,
  isLoggedIn: false
})

export const mutations: MutationTree<RootState> = {
  setLoading(state, b: boolean) {
    state.loading = b
  },
  setUserAuthToken(state, authToken: string) {
    if(!authToken) {
        state.isLoggedIn = false
    } else if(authToken === state.userAuthToken) {
        return
    } else {
        state.isLoggedIn = true
        state.userAuthToken = authToken
        axios.defaults.headers.common['authToken'] = authToken
        Vue.$cookies.set('vmt-authToken', authToken)
    }
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async authenticate({ commit }, login: { email: string; password: string }) {
    commit('setLoading', true)
    commit('setUserAuthToken', null)
    await axios
      .post('user/login', login)
      .then(response => {
        const authToken = response.data.authToken
        commit('setUserAuthToken', authToken)
        commit('setLoading', false);
      })
      .catch(error => {
        commit('setLoading', false);
        console.log("error logging in: ")
        console.log(error.response)
        if(error.response)
            throw error.response.data.error
        throw "Unknown error logging in"
      })
  },
  async preAuthenticate({ commit }) {
    try {
      const auth = Vue.$cookies.get('vmt-authToken')
      console.log(`found cookie: ${auth}`)
      commit('setUserAuthToken', auth)
    } catch(e) {
      console.log('cookie does not exist')
    }
  },
    register({commit}, account: {email: string, name: string, password: string}) {
      axios.post('/user/register', account)
          .then(response => {
              const authToken = response.data.authToken
              console.log(authToken);
              axios.defaults.headers.common['authToken'] = authToken
              commit('setUserAuthToken', authToken)
              Vue.$cookies.set('vmt-authToken', authToken)
          })
    },
  logout({ commit }) {
    commit('setUserAuthToken', null)
    Vue.$cookies.remove('vmt-authToken')
  },
  async createAccount({commit}, account: NewAccount) {
    commit('setLoading', true)
    commit('setUserAuthToken', null)
    console.log(account)
    await axios.post(`user/register`, account)
    .then(response => {
      console.log(response)
      const authToken = response.data.authToken
      commit('setUserAuthToken', authToken)
      commit('setLoading', false)
    })
    .catch(error => {
      commit('setLoading', false);
      console.log("error creating account")
      if(error.response)
        throw error.response.data.error
      throw "Unknown error creating account"
    })
    commit('setLoading', false)
  },
  async requestReset({ commit }, email: string) {
    commit('setLoading', true)
    await axios.post('user/reset', null, { headers: { Email: email } })
    commit('setLoading', false)
  },
  async resetPassword({ commit }, account: { password: string; resetToken: string }) {
    commit('setLoading', true)
    await axios.put(
      'user',
      { password: account.password },
      { headers: { resetToken: account.resetToken, authToken: account.resetToken } }
    )
    commit('setLoading', false)
  }
}
