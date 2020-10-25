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
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    }
  },
  methods: {
    async getVehicles() {
      // let v = await this.$axios.$get('/vehicles')
      const a = {
        vehicleId: '1',
        year: 2020,
        nickname: "nickname",
        model: "Model",
        mileage: 150000,
        make: "Make",
        color: "Color",
        nextMaintenance: {
          maintenanceItemId: "id",
          vehicleId: "id",
          frequencyMonths: 6,
          frequencyMiles: 500,
          description: "Oil Change",
          lastCompletedDate: 'date',
          lastCompletedMileage: 56000
        },
        registrationMonth: "Jan",
        energyType: "electric",
        transmissionType: "Manual",
        imageUrl: "https://cdn.vuetifyjs.com/images/cards/cooking.png"
      }
      const b = {
        vehicleId: '2',
        year: 2020,
        nickname: "nickname2",
        model: "Model2",
        mileage: 150000,
        make: "Make2",
        nextMaintenance: {
          maintenanceItemId: "id",
          vehicleId: "id",
          frequencyMonths: 6,
          frequencyMiles: 500,
          description: "Oil Change",
          lastCompletedDate: 'date',
          lastCompletedMileage: 56000
        },
        color: "Color2",
        registrationMonth: "Jan",
        energyType: "gasoline",
        transmissionType: "Transmission2",
        imageUrl: "https://cdn.vuetifyjs.com/images/cards/cooking.png"
      }

      this.loading = false
      return [a, b]
    },
    addVehicle() {
      this.$router.push('/add-vehicle')
    }
  },
  async mounted() {
    this.vehicles = await this.getVehicles()
  }
}
</script>
