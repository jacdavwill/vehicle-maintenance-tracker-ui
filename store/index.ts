import { ActionTree, MutationTree } from 'vuex'
import { RootState } from '~/types'
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
      if (authToken == null) {
          state.userAuthToken = undefined
          state.isLoggedIn = false
      } else {
          state.isLoggedIn = true
          state.userAuthToken = authToken
      }
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async authenticate({ commit }, login: { email: string; password: string }) {
    commit('setLoading', true)
    return axios
      .post('user/login', login)
      .then(response => {
        const authToken = response.data.authToken
          Vue.$cookies.set('vmt-authToken', authToken)
        axios.defaults.headers.common['authToken'] = authToken
        commit('setUserAuthToken', authToken)
        commit('setLoading', false)
          console.log('finished setting auth')
          return true
      })
      .catch(() => {
        // maybe show failure dialog box, possibly clear last entered email and username
        commit('setLoading', false)
        console.log("error logging in")
        return false
      })
  },
  async preAuthenticate({ commit }) {
    try {
      const auth = Vue.$cookies.get('vmt-authToken')
      console.log(`found cookie: ${auth}`)
        commit('setUserAuthToken', auth)
        axios.defaults.headers.common['authToken'] = auth
    } catch(e) {
      console.log(`cookie doesn't exist`)
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
    axios.defaults.headers.common['authToken'] = ''
    commit('setUserAuthToken', null)
    Vue.$cookies.remove('vmt-authToken')
  }
}
