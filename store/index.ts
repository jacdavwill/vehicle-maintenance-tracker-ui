import { ActionTree, MutationTree } from 'vuex'
import { RootState } from '../../deleteMeTemp-master/deleteMeTemp-master/types/state'
import axios from 'axios'

export const state = (): RootState => ({
  userAuthToken: undefined
})

export const mutations: MutationTree<RootState> = {
  setUserAuthToken(state, userAuthToken: string) {
    state.userAuthToken = userAuthToken
  }
}

export const actions: ActionTree<RootState, RootState> = {
  authenticate({ commit }, login: { email: string; password: string }) {
    this.$axios
      .$post('user/login', login)
      .then(response => {
        const authToken = response.authorization
        axios.defaults.headers.common['Authorization'] = authToken
        commit('setUserAuthToken', authToken)
      })
      .catch(() => {
        // maybe show failure dialog box, possibly clear last entered email and username
      })
  }
}
