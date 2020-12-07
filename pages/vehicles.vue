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
          <v-card-title>Next Maintenance</v-card-title>
          <v-card-text v-if="vehicle.nextMaintenance != null">
            <div>{{ vehicle.nextMaintenance.description }}:</div>
            <div>{{ formatDate(vehicle.nextMaintenance.eventDate) }}</div>
          </v-card-text>
          <v-divider class="mx-4"></v-divider>
          <v-card-title>Details</v-card-title>
          <v-card-text>
            <div>Mileage: {{ formatMileage(vehicle.mileage) }}</div>
            <div>Color: {{ vehicle.color }}</div>
            <div>Transmission: {{ vehicle.transmissionType }}</div>
            <div>Fuel: {{ vehicle.energyType }}</div>
          </v-card-text>
          <v-btn @click="editVehicle({{vehicle}})">
            Edit vehicle
          </v-btn>
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
      const resp = this.$store.dispatch('vehicles/getVehicles')
      this.loading = false
      return resp
    },
    editVehicle(vehicle) {
      this.$router.push('/editVehicle/${vehicle.vehicleId}')
    },
    addVehicle() {
      this.$router.push('/add-vehicle')
    },
    formatDate(date) {
      return moment(date).format('MMMM Do YYYY')
    },
    formatMileage(mileage) {
      return mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
