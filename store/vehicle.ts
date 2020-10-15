import { ActionTree, MutationTree } from 'vuex'
import { RootState, VehicleState } from '~/types/state'
import { Vehicle } from '~/types/vehicle'

export const state = (): VehicleState => ({
  vehicles: []
})

export const mutations: MutationTree<VehicleState> = {
  setVehicles(state, vehicles: Vehicle[]) {
    state.vehicles = vehicles
  },
  editVehicle(state, newVehicle: Vehicle) {
    state.vehicles = state.vehicles.filter(
      vehicle => vehicle.vehicleId !== newVehicle.vehicleId
    )
    state.vehicles.push(newVehicle)
  },
  addVehicle(state, vehicle: Vehicle) {
    state.vehicles.push(vehicle)
  }
}

export const actions: ActionTree<VehicleState, RootState> = {
  async load({ commit }) {
    // await this.$axios.$post('vehicles').then(response => {
    //   commit('setVehicles', response)
    // })

    const a = {
      year: 2020,
      nickname: 'nickname',
      model: 'Model',
      mileage: 150000,
      make: 'Make',
      color: 'Color',
      transmission: 'Transmission',
      image: 'image url',
      lastOilChangeDate: 'oil change',
      lastTireRotationDate: 'tire rotation',
      lastRegistrationDate: 'registration'
    }
    const b = {
      year: 2020,
      nickname: 'nickname2',
      model: 'Model2',
      mileage: 150000,
      make: 'Make2',
      color: 'Color2',
      transmission: 'Transmission2',
      image: 'image url2',
      lastOilChangeDate: 'oil change2',
      lastTireRotationDate: 'tire rotation2',
      lastRegistrationDate: 'registration2'
    }

    commit('addVehicle', a)
    commit('addVehicle', b)
  },
  editVehicle({ commit }, vehicle: Vehicle) {
    this.$axios.$put(`vehicle/${vehicle.vehicleId}`, vehicle).then(vehicle => {
      commit('editVehicle', vehicle)
    })
  },
  addVehicle({ commit }, vehicle: Vehicle) {
    this.$axios.$put(`vehicle`, vehicle).then(vehicle => {
      commit('addVehicle', vehicle)
    })
  },
  deleteVehicle({ commit }, vehicleId: string) {
    this.$axios.$delete(`vehicle/${vehicleId}`)
  }
}
