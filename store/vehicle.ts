import {ActionTree, MutationTree} from 'vuex'
import {RootState, VehicleState} from '../types/state'
import {Vehicle} from '../types/vehicle'

export const vehicleState = (): VehicleState => ({
  loading: false,
  vehicles: [{
    userId: 'userId',
    vehicleId: 'vehicle1',
    year: 2020,
    nickname: 'nickname',
    model: 'Model',
    mileage: 150000,
    make: 'Make',
    color: 'Color',
    transmissionType: 'Transmission',
    imageUrl: 'image url',
    energyType: 'gasoline',
    registrationMonth: 'Jan'
  }]
})

export const vehicleMutations: MutationTree<VehicleState> = {
  setLoading(state, loading: boolean) {
    state.loading = loading
  },
  setVehicles(state, vehicles: Vehicle[]) {
    state.vehicles = vehicles
  },
  getVehicles(state) {
    console.log(`vehicle store.getVehicles (mutation): ${state.vehicles}`)
    return state.vehicles
  },
  updateVehicles(state, newVehicle: Vehicle) {
    state.vehicles = state.vehicles.filter(
      vehicle => vehicle.vehicleId !== newVehicle.vehicleId
    )
    console.log(`added vehicle with id: ${newVehicle.vehicleId}`)
    state.vehicles.push(newVehicle)
  }
}

export const vehicleActions: ActionTree<VehicleState, RootState> = {
  async getVehicles({state, commit}) {
    // await this.$axios.$post('vehicles').then(response => {
    //   commit('setVehicles', response)
    // })
    console.log('vehicles loaded')
    commit('setLoading', true)
    const a = {
      vehicleId: 'vehicle1',
      year: 2020,
      nickname: 'nickname',
      model: 'Model',
      mileage: 150000,
      make: 'Make',
      color: 'Color',
      transmissionType: 'Transmission',
      imageUrl: 'image url',
      energyType: 'gasoline',
      registrationMonth: 'Jan'
    }
    const b = {
      vehicleId: 'vehicle2',
      year: 2020,
      nickname: 'nickname2',
      model: 'Model2',
      mileage: 150000,
      make: 'Make2',
      color: 'Color2',
      transmissionType: 'Transmission2',
      imageUrl: 'image url2',
      energyType: 'electric',
      registrationMonth: 'Jan'
    }
    if (state.vehicles.length == 0) {
      commit('updateVehicles', a)
      commit('updateVehicles', b)
    }
    commit('setLoading', false)
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
