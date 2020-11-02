<template>
  <div>
    <div>
      <v-btn @click="addVehicle">
        Add Vehicle
      </v-btn>
    </div>
    <v-row v-model="vehicles" v-for="(vehicle, index) in vehicles" :key="index">
      <v-card class="mx-auto my-12" max-width="374">
        <template slot="progress">
          <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
        </template>
        <v-img height="250" :src=vehicle.imageUrl></v-img>
        <v-card-title>{{ vehicle.nickname }}</v-card-title>
        <v-card-subtitle>{{ vehicle.model }} {{ vehicle.make }}, {{ vehicle.year }}</v-card-subtitle>
        <v-divider class="mx-4"></v-divider>
        <v-card-title>Next Maintenance</v-card-title>
        <v-card-text>
          <div>{{ vehicle.nextMaintenance.description }}</div>
<!--          todo: this needs to be the last date plus the frequency-->
          <div>{{ vehicle.nextMaintenance.lastCompletedDate }}</div>
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
      const resp = this.$store.dispatch('vehicles/getVehicles')
      this.loading = false
      return resp
    },
    addVehicle() {
      this.$router.push('/add-vehicle')
    }
  },
  async mounted() {
    this.vehicles = await this.getVehicles()
  },
  beforeMount() {
    if (!this.$store.state.userAuthToken) {
      this.$router.push('/')
    }
  }
}
</script>
