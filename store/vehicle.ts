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
  async getVehicles({state, commit}) {
      const rawVehicles = await axios.get(`vehicles`).then(response => {
          return response.data
      })
          .catch((error) => console.log(error))
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
      commit('updateVehicles', finalVehicles)
      return finalVehicles
    return []
  },
  editVehicle({commit}, vehicle: Vehicle) {
    axios.put(`vehicles/${vehicle.vehicleId}`, vehicle).then(vehicle => {
      commit('editVehicle', vehicle)
    })
  },
  addVehicle({commit}, vehicle: Vehicle) {
    axios.post(`vehicles`, vehicle).then(response => {
      commit('updateVehicles', response.data)
    })
  },
  deleteVehicle({commit}, vehicleId: string) {
    axios.delete(`vehicles/${vehicleId}`)
  }
}
