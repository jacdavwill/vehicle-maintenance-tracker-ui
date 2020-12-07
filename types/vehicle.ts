export interface Vehicle {
  vehicleId: string
  userId: string
  imageUrl: string
  registrationMonth: string
  mileage: number
  year: number
  nickname: string
  model: string
  make: string
  color: string
  transmissionType: string
  energyType: string
  nextMaintenance?: {} | undefined
}
