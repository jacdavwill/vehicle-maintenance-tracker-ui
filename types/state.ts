import { Vehicle } from '~/types/vehicle'

export interface RootState {
  userAuthToken?: string | undefined
}

export interface VehicleState extends RootState {
  vehicles: Vehicle[]
}
