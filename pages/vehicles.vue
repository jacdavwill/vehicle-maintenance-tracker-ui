<template>
  <div>
    <v-row v-for="vehicle in allVehicles" :key="vehicle.vehicleId">
      <v-card :loading="loading" class="mx-auto my-12" max-width="374">
        <template slot="progress">
          <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
        </template>
        <v-img height="250" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>
        <v-card-title>My Vehicle</v-card-title>
        <v-card-subtitle>Honda Civic, 2016</v-card-subtitle>
        <v-divider class="mx-4"></v-divider>
        <v-card-title>Next Maintenance</v-card-title>
        <v-card-text>
          <div>Oil Change</div>
          <div>May 25, 2021</div>
        </v-card-text>
        <v-spacer></v-spacer>
        <v-card-text>
          <div>Odometer</div>
          <div>15,230 miles</div>
        </v-card-text>
        <v-divider class="mx-4"></v-divider>
        <v-card-text>
          <div>Total Cost: $15,000,000</div>
        </v-card-text>
        <v-divider class="mx-4"></v-divider>
        <v-btn
          color="secondary"
          align="center"
          elevation="2"
          text
          @click="reserve"
        >Details
        </v-btn>
      </v-card>
    </v-row>
  </div>
</template>

<script lang="ts">
import {  } from "~/store/vehicle";
import { Vue } from 'nuxt-property-decorator'

const store = Vue.use(Vuex)

export default {
  data: function() {
    return {
      reactive: true,
      loading: false,
      selection: 1,
      allVehicles: vehicleState().vehicles
    }
  },
  mounted() {
    // this.loading = true
    // this.allVehicles = this.$store.dispatch('vehicle/getVehicles')
    // this.loading = false
  },
  methods: {
    reserve() {

    },

    vehicles() {
      // this.$store.commit('vehicle/getVehicles')
    }
  }
}
</script>
