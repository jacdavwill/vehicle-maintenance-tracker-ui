import { User } from './user.ts'
import { Vehicle } from './vehicle'

export interface RootState {
  userAuthToken?: string | undefined
  loading?: boolean
  isLoggedIn?: boolean
}
export interface VehicleState extends RootState {
  vehicles: Vehicle[]
}
