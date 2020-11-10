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

export const state = (): RootState => ({
  loading: false,
  userAuthToken: undefined
  isLoggedIn: false,
})

export const mutations: MutationTree<RootState> = {
  setLoading(state, b: boolean) {
    state.loading = b
  },
  setUserAuthToken(state, authToken: string) {
    if(!authToken) {
        state.isLoggedIn = false
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
    Vue.$cookies.remove('vmt-authToken')
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
  preAuthenticate({ commit }) {
    try {
      const auth = Vue.$cookies.get('vmt-authToken')
      console.log(`found cookie: ${auth}`)
      commit('setUserAuthToken', auth)
    } catch(e) {
      console.log('cookie does not exist')
    }
  },
  logout({ commit }) {
    axios.defaults.headers.common['authToken'] = ''
    commit('setUserAuthToken', undefined)
    Vue.$cookies.remove('vmt-authToken')
  },
  async createAccount({commit}, account: NewAccount) {
    commit('setLoading', true)
    Vue.$cookies.remove('vmt-authToken')
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
  }
}
