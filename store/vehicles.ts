import {ActionTree, MutationTree} from 'vuex'
import {RootState, VehicleState} from '../../deleteMeTemp-master/deleteMeTemp-master/types/state'
import {Vehicle} from '../../deleteMeTemp-master/deleteMeTemp-master/types/vehicle'

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
    // await this.$axios.$get('vehicles').then(response => {
    //   commit('setVehicles', response)
    // })
    const a = {
      vehicleId: '1',
      year: 2020,
      nickname: "nickname",
      model: "Model",
      mileage: 150000,
      make: "Make",
      color: "Color",
      nextMaintenance: {
        maintenanceItemId: "id",
        vehicleId: "id",
        frequencyMonths: 6,
        frequencyMiles: 500,
        description: "Oil Change",
        lastCompletedDate: 'date',
        lastCompletedMileage: 56000
      },
      registrationMonth: "Jan",
      energyType: "electric",
      transmissionType: "Manual",
      imageUrl: "https://cdn.vuetifyjs.com/images/cards/cooking.png"
    }
    const b = {
      vehicleId: '2',
      year: 2020,
      nickname: "nickname2",
      model: "Model2",
      mileage: 150000,
      make: "Make2",
      nextMaintenance: {
        maintenanceItemId: "id",
        vehicleId: "id",
        frequencyMonths: 6,
        frequencyMiles: 500,
        description: "Oil Change",
        lastCompletedDate: 'date',
        lastCompletedMileage: 56000
      },
      color: "Color2",
      registrationMonth: "Jan",
      energyType: "gasoline",
      transmissionType: "Transmission2",
      imageUrl: "https://cdn.vuetifyjs.com/images/cards/cooking.png"
    }
    if (state.vehicles.length == 0) {
      commit('updateVehicles', a)
      commit('updateVehicles', b)
    }
    return [a, b]
  },
  editVehicle({commit}, vehicle: Vehicle) {
    this.$axios.$put(`vehicle/${vehicle.vehicleId}`, vehicle).then(vehicle => {
      commit('editVehicle', vehicle)
    })
  },
  addVehicle({commit}, vehicle: Vehicle) {
    this.$axios.$put(`vehicle`, vehicle).then(vehicle => {
      commit('addVehicle', vehicle)
    })
  },
  deleteVehicle({commit}, vehicleId: string) {
    this.$axios.$delete(`vehicle/${vehicleId}`)
  }
}
