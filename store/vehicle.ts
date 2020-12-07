import {ActionTree, MutationTree} from 'vuex'
import {Vehicle} from '~/types/vehicle'
import axios from 'axios'
import {RootState, VehicleState} from '~/types/state'
import {Notification} from "~/types/notification";

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
      const rawVehicles = await axios.get(`vehicles`).then(response => {
          return response.data
      }).catch((error) => console.log(error))

      const notifications = await axios.get('notifications').then(resp => resp.data).catch((error) => console.log(error))
      console.log(notifications)
      const finalVehicles: Vehicle[] = []
      for (let vehicle of rawVehicles) {
          const main = await axios.get(`maintenance/items/${vehicle.vehicleId}`).then(response => {
              return response.data
          })
          vehicle.notifications = []
          if (main !== null && main.length > 0) {
              for (let item of main) {
                  let date = new Date(item.lastCompletedDate)
                  item.dueDate = date.setMonth(date.getMonth() + item.frequencyMonths)
                  for (let not of notifications) {
                      if (not.maintItemId == item.maintenanceItemId) {
                          vehicle.notifications.push(not)
                          console.log('added notification')
                      }
                  }
              }
              vehicle.nextMaintenance = main
          }
          finalVehicles.push(vehicle)
      }
      console.log(finalVehicles)
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
        let newVehicle = response.data
      commit('updateVehicles', newVehicle)

      let oilItem = {
          "vehicleId": newVehicle.vehicleId,
          "frequencyMonths": 6,
          "frequencyMiles": 10000,
          "description": "Oil Change",
          "lastCompletedDate": vehicle.lastOilChangeDate ? `${vehicle.lastOilChangeDate}T00:00:00.000Z` : new Date().toISOString().substring(0, 10),
          "lastCompletedMileage": vehicle.mileage ? vehicle.mileage : 0
      }
        let regItem = {
            "vehicleId": newVehicle.vehicleId,
            "frequencyMonths": 12,
            "frequencyMiles": 10000,
            "description": "Vehicle Registration",
            "lastCompletedDate": vehicle.lastRegistrationDate ? `${vehicle.lastRegistrationDate}T00:00:00.000Z` : new Date().toISOString().substring(0, 10),
            "lastCompletedMileage": vehicle.mileage ? vehicle.mileage : 0
        }
        let rotItem = {
            "vehicleId": newVehicle.vehicleId,
            "frequencyMonths": 12,
            "frequencyMiles": 10000,
            "description": "Tire Rotation",
            "lastCompletedDate": vehicle.lastTireRotationDate ? `${vehicle.lastTireRotationDate}T00:00:00.000Z` : new Date().toISOString().substring(0, 10),
            "lastCompletedMileage": vehicle.mileage ? vehicle.mileage : 0
        }
      axios.post(`maintenance/items/${newVehicle.vehicleId}`, oilItem).then(resp => console.log(resp))
        axios.post(`maintenance/items/${newVehicle.vehicleId}`, regItem).then(resp => console.log(resp))
        axios.post(`maintenance/items/${newVehicle.vehicleId}`, rotItem).then(resp => console.log(resp))
    })
  },
  deleteVehicle({commit}, vehicleId: string) {
    axios.delete(`vehicles/${vehicleId}`)
  }
}
