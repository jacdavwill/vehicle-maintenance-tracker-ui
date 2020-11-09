<<<<<<< HEAD
import { User } from "~/types/user";

export interface AuthenticationState {
  authenticated: boolean
  user: User
=======
import { Vehicle } from './vehicle'
import { NewAccount } from './newAccount'

export interface RootState {
  userAuthToken?: string | undefined
  loading?: boolean
}

export interface VehicleState extends RootState {
  vehicles: Vehicle[]
}
export interface CreateAccountState extends RootState {
  account: NewAccount
>>>>>>> dev
}
