import {ActionTree, MutationTree} from 'vuex'
import {Vehicle} from '~/types/vehicle'
import axios from 'axios'
import {RootState, VehicleState} from '~/types/state'

export const state = (): VehicleState => ({
  loading: false,
  vehicles: []
})

export const mutations: MutationTree<VehicleState> = {
  setVehicles(state, vehicles: Vehicle[]) {
    state.vehicles = vehicles
  },
  getVehicles(state) {
    return state.vehicles
  },
  updateVehicles(state, newVehicle: Vehicle) {
    state.vehicles = state.vehicles.filter(
      vehicle => vehicle.vehicleId !== newVehicle.vehicleId
    )
    state.vehicles.push(newVehicle)
  }
}

export const actions: ActionTree<VehicleState, RootState> = {
  async getVehicles({commit}) {
    return await axios.get(`vehicles`).then(response => {
      commit('updateVehicles', response)
      return response.data
    })
      .catch((error) => console.log(error))
  },
  editVehicle({commit}, vehicle: Vehicle) {
    axios.put(`vehicles/${vehicle.vehicleId}`, vehicle).then(vehicle => {
      commit('editVehicle', vehicle)
    })
  },
  addVehicle({commit}, vehicle: Vehicle) {
    axios.post(`vehicles`, vehicle).then(vehicle => {
      commit('addVehicle', vehicle)
    })
  },
  deleteVehicle({commit}, vehicleId: string) {
    axios.delete(`vehicles/${vehicleId}`)
  }
}
