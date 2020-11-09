import {ActionTree, MutationTree} from 'vuex'
import {RootState, CreateAccountState} from '../types/state'
import {NewAccount} from '~/types/newAccount'

export const createAccountMutations: MutationTree<CreateAccountState> = {
  setAccountInfo(state, account: NewAccount) {
    state.account = account
  },
  getAccountInfo(state) {
    return state.account
  }
}

export const createAccountActions: ActionTree<CreateAccountState, RootState> = {
  async createAccount({commit}, account: NewAccount) {
    commit('setLoading', true)
    this.$axios.$put(`createAccount`, account).then(account => {
      commit('setAccountInfo', account)
    })
    commit('setLoading', false)
  }
}
