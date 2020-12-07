export interface maintenanceItem {
  maintenanceItemId: string,
  vehicleId: string,
  frequencyMonths: number,
  frequencyMiles: number,
  description: string,
  lastCompletedDate: string,
  lastCompletedMileage: number,
    dueDate?: string | undefined
}
