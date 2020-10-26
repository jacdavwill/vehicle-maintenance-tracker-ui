import { Vehicle } from './vehicle'

export interface RootState {
  userAuthToken?: string | undefined
  loading?: boolean
}

export interface VehicleState extends RootState {
  vehicles: Vehicle[]
}
