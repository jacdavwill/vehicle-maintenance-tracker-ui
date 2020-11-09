import { ActionTree, MutationTree } from 'vuex'
import { RootState } from '~/types'
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
})

export const mutations: MutationTree<RootState> = {
  setLoading(state, b: boolean) {
    state.loading = b
  },
  setUserAuthToken(state, authToken: string) {
    console.log(state)
    state.userAuthToken = authToken
  }
}

export const actions: ActionTree<RootState, RootState> = {
  authenticate({ commit }, login: { email: string; password: string }) {
    commit('setLoading', true)
    axios
      .post('user/login', login)
      .then(response => {
        const authToken = response.data.authToken // TODO: fix that
        console.log(authToken);
        axios.defaults.headers.common['authToken'] = authToken
        commit('setUserAuthToken', authToken)
        Vue.$cookies.set('vmt-authToken', authToken)
        commit('setLoading', false);
      })
      .catch(() => {
        // maybe show failure dialog box, possibly clear last entered email and username
        commit('setLoading', false);
        console.log("error logging in")
        return "Something went wrong"
      })
  },
  preAuthenticate({ commit }) {
    try {
      const auth = Vue.$cookies.get('vmt-authToken')
      console.log(`found cookie: ${auth}`)
      commit('setUserAuthToken', auth)
      axios.defaults.headers.commmon['authToken'] = auth
    } catch(e) {
      console.log('cookie doesnt exist')
    }
  },
  logout({ commit }) {
    axios.defaults.headers.common['authToken'] = ''
    commit('setUserAuthToken', undefined)
    Vue.$cookies.remove('vmt-authToken')
  }
}
