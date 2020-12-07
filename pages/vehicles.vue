<template>
  <div>
    <div>
      <v-btn @click="addVehicle">
        Add Vehicle
      </v-btn>
    </div>
    <div v-if="vehicles.length > 0">
      <v-row v-model="vehicles" v-for="(vehicle, index) in vehicles" :key="index">
        <v-card class="mx-auto my-12" max-width="374" min-width="300">
          <template slot="progress">
            <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
          </template>
          <v-img height="250" :src=vehicle.imageUrl></v-img>
          <v-card-title>{{ vehicle.nickname }}</v-card-title>
          <v-card-subtitle>{{ vehicle.year }} {{ vehicle.make }} {{ vehicle.model }}</v-card-subtitle>
          <v-divider class="mx-4"></v-divider>
          <v-card-title>Future Maintenance</v-card-title>
          <v-card-text v-if="vehicle.nextMaintenance != null">
            <div v-if="vehicle.nextMaintenance.length > 0">{{ vehicle.nextMaintenance[0].description }} : {{ formatDate(vehicle.nextMaintenance[0].dueDate) }}</div>
            <div v-if="vehicle.nextMaintenance.length > 1">{{ vehicle.nextMaintenance[1].description }} : {{ formatDate(vehicle.nextMaintenance[1].dueDate) }}</div>
            <div v-if="vehicle.nextMaintenance.length > 2">{{ vehicle.nextMaintenance[2].description }} : {{ formatDate(vehicle.nextMaintenance[2].dueDate) }}</div>
          </v-card-text>
          <v-divider class="mx-4"></v-divider>
          <v-card-title>Details</v-card-title>
          <v-card-text>
            <div>Mileage: {{ formatMileage(vehicle.mileage) }}</div>
            <div>Color: {{ vehicle.color }}</div>
            <div>Transmission: {{ vehicle.transmissionType }}</div>
            <div>Fuel: {{ vehicle.energyType }}</div>
          </v-card-text>
          <div v-if="vehicle.notifications != null && vehicle.notifications.length > 0">
            <v-divider class="mx-4"></v-divider>
            <v-card-title>Notification</v-card-title>
            <v-card-text>
              <v-row>
                <v-col>
                  <div>{{ vehicle.notifications[0].displayMessage }}</div>
                </v-col>
                <v-col class="text-right">
                  <v-btn color="warning" class="black--text">Complete</v-btn>
                </v-col>
              </v-row>
              <v-row v-if="vehicle.notifications.length > 1">
                <v-col>
                  <div>{{ vehicle.notifications[1].displayMessage }}</div>
                </v-col>
                <v-col class="text-right">
                  <v-btn color="warning" class="black--text">Complete</v-btn>
                </v-col>
              </v-row>
              <v-row v-if="vehicle.notifications.length > 2">
                <v-col>
                  <div>{{ vehicle.notifications[2].displayMessage }}</div>
                </v-col>
                <v-col class="text-right">
                  <v-btn color="warning" class="black--text">Complete</v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </div>
          <v-row>
            <v-col class="text-center">
              <v-btn color="warning" class="black--text" @click="editVehicle(vehicle)" >
                Edit vehicle
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-row>
    </div>
    <div v-else>
      <br>
      You have not added any vehicles to your account. Click the ADD VEHICLE button to get started!
    </div>
  </div>
</template>

<script>
var moment = require('moment');
export default {
  data: () => ({
    loading: true,
    vehicles: []
  }),
  methods: {
    async getVehicles() {
      console.log('get vehicles')
      const resp = this.$store.dispatch('vehicle/getVehicles')
      this.loading = false
      return resp
    },
    editVehicle(vehicle) {
      this.$store.commit('vehicle/setVehicleToEdit', vehicle.vehicleId)
      this.$router.push('/editVehicle')
    },
    addVehicle() {
      this.$router.push('/add-vehicle')
    },
    formatDate(date) {
      return moment(date).format('MMMM Do YYYY')
    },
    formatMileage(mileage) {
      return mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    removeNotification(vehicleId, notificationId) {
      for (let vehicle in this.vehicles) {
        if (vehicle.vehicleId.toString() === vehicleId.toString()) {

        }
      }
    }
  },
  async mounted() {
    if (this.$store.state.isLoggedIn) {
      this.vehicles = await this.getVehicles()
    }
  },
  async beforeMount() {
    const preauth = await this.$store.dispatch('preAuthenticate')
    if (!this.$store.state.isLoggedIn) {
      this.$router.push('/')
    }
  }
}
</script>
