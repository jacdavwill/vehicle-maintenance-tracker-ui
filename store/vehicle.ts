import {ActionTree, MutationTree} from 'vuex'
import {Vehicle} from '~/types/vehicle'
import axios from 'axios'
import {RootState, VehicleState} from '~/types/state'

export const state = (): VehicleState => ({
  loading: false,
  vehicles: [],
    vehicleToEdit: undefined
})

export const mutations: MutationTree<VehicleState> = {
  setVehicles(state, vehicles: Vehicle[]) {
    state.vehicles = vehicles
  },
  getVehicles(state) {
    return state.vehicles
  },
  getVehicle(state, vehicleId: string) {
    let ans = state.vehicles.filter(vehicle => {
      return vehicle.vehicleId.toString() === vehicleId.toString()
    })
      return ans[0]
  },
  updateVehicles(state, newVehicle: Vehicle) {
    state.vehicles = state.vehicles.filter(vehicle => {
        return vehicle.vehicleId !== newVehicle.vehicleId
    })
    state.vehicles.push(newVehicle)
  },
  setVehicleToEdit(state, vehicleId) {
    console.log('setting vehicleToEdit: ' + vehicleId)
    state.vehicleToEdit = vehicleId
  }
}

export const actions: ActionTree<VehicleState, RootState> = {
  async getVehicles({state, commit}) {
      const rawVehicles = await axios.get(`vehicles`).then(response => {
          return response.data
      }).catch((error) => console.log(error))
      const finalVehicles: Vehicle[] = []
      for (let vehicle of rawVehicles) {
          const main = await axios.get(`maintenance/events/${vehicle.vehicleId}`).then(response => {
              return response.data
          })
          if (main !== null && main.length > 0) {
              vehicle.nextMaintenance = main[0]
          }
          finalVehicles.push(vehicle)
      }
      commit('setVehicles', finalVehicles)
      return finalVehicles
    return []
  },
  async editVehicle({commit}, vehicle: Vehicle) {
    axios.put(`vehicles/${vehicle.vehicleId}`, vehicle).then(response => {
      commit('updateVehicles', vehicle)
    })
  },
  async addVehicle({commit}, vehicle: Vehicle) {
    axios.post(`vehicles`, vehicle).then(response => {
      commit('updateVehicles', response.data)
    })
  },
  async deleteVehicle({commit}, vehicleId: string) {
    axios.delete(`vehicles/${vehicleId}`)
  },
}
