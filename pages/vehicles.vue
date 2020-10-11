<template>
  <v-card :loading="loading" class="mx-auto my-12" max-width="374">
    <template slot="progress">
      <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
    </template>
    <v-img height="250" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>
    <v-card-title>Mom's Car</v-card-title>
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
    >Details</v-btn>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    selection: 1,
  }),

  methods: {
    reserve() {
      this.loading = true

      setTimeout(() => (this.loading = false), 2000)
    },
  },
}
</script>
