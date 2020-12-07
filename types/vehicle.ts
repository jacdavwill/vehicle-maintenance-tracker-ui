import {maintenanceItem} from "~/types/maintenanceItem";
import {Notification} from "~/types/notification";

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
    lastOilChangeDate?: string | undefined
    lastRegistrationDate?: string | undefined
    lastTireRotationDate?: string | undefined
    nextMaintenance?: [maintenanceItem] | undefined
    notifications?: [Notification] | undefined
}
