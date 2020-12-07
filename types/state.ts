import { Vehicle } from './vehicle'

export interface RootState {
  userAuthToken?: string | undefined
  loading?: boolean
  isLoggedIn?: boolean
}
export interface VehicleState extends RootState {
  vehicles: Vehicle[]
    vehicleToEdit?: string //this needed because passing parameters through router.push() is not possible with the current setup
}
