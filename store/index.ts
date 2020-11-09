import { ActionTree, MutationTree } from 'vuex'
import { RootState } from '~/types'
import axios from 'axios'

axios.defaults.headers.common['sessionKey'] = "lalalal"
axios.defaults.baseURL = "http://ec2-34-212-167-238.us-west-2.compute.amazonaws.com:8080/api/"


export const state = (): RootState => ({
  loading: false,
})

export const mutations: MutationTree<RootState> = {
  setLoading(state, b: boolean) {
    state.loading = b;
  },
    setAuthToken(state, authToken: string) {
      state.userAuthToken = authToken
    }
}

export const actions: ActionTree<RootState, RootState> = {
  authenticate({ commit }, login: { email: string; password: string }) {
    commit('setLoading', true)
    axios
      .post('user/login', login)
      .then(response => {
        const authToken = response.data.authToken
        console.log(`Auth Token: ${authToken}`)
        axios.defaults.headers.common['authToken'] = authToken
          commit('setAuthToken', authToken)
        commit('setLoading', false);
      })
      .catch(() => {
        // maybe show failure dialog box, possibly clear last entered email and username
        commit('setLoading', false);
        console.log("error logging in");
        return "Something went wrong";
      })
  }
}
