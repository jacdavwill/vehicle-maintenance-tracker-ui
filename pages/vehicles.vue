<template>
  <div>
    <div>
      <v-btn @click="addVehicle">
        Add Vehicle
      </v-btn>
    </div>
    <v-row v-model="vehicles" v-for="(vehicle, index) in vehicles" :key="index">
      <v-card class="mx-auto my-12" max-width="374" min-width="300">
        <template slot="progress">
          <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
        </template>
        <v-img height="250" :src=vehicle.imageUrl></v-img>
        <v-card-title>{{ vehicle.nickname }}</v-card-title>
        <v-card-subtitle>{{ vehicle.model }} {{ vehicle.make }}, {{ vehicle.year }}</v-card-subtitle>
        <v-divider class="mx-4"></v-divider>
        <v-card-title>Next Maintenance</v-card-title>
        <v-card-text v-if="vehicle.nextMaintenance != null">
          <div>{{ vehicle.nextMaintenance.description }}:</div>
          <div>{{ formatDate(vehicle.nextMaintenance.eventDate) }}</div>
        </v-card-text>
        <v-divider class="mx-4"></v-divider>
        <v-card-title>Details</v-card-title>
        <v-card-text>
          <div>Mileage: {{ vehicle.mileage }}</div>
          <div>Color: {{ vehicle.color }}</div>
          <div>Transmission: {{ vehicle.transmissionType }}</div>
          <div>Fuel: {{ vehicle.energyType }}</div>
        </v-card-text>
      </v-card>
    </v-row>
  </div>
</template>

<script>
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
    addVehicle() {
      this.$router.push('/add-vehicle')
    },
    formatDate(date) {
      return date.substring(0, 10).split('-').reverse().join('-')
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
