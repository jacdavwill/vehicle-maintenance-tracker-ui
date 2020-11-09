import { Vehicle } from './vehicle'
import { NewAccount } from './newAccount'

export interface RootState {
  userAuthToken?: string | undefined
  loading?: boolean
    isLoggedIn?: boolean
}

export interface VehicleState extends RootState {
  vehicles: Vehicle[]
}
export interface CreateAccountState extends RootState {
  account: NewAccount
}
