import { ActionTree, MutationTree } from 'vuex'
import { AuthenticationState } from "~/types";

export const state = (): AuthenticationState => ({
  authenticated: false,
  user: {
    userName: '',
    userId: '',
    email: ''
  }
})

export const mutations: MutationTree<AuthenticationState> = {

}

export const actions: ActionTree<AuthenticationState, AuthenticationState> = {
  authenticate({ dispatch, state }, login) {
    console.log('did search')
    state.authenticated = true
  }
}
