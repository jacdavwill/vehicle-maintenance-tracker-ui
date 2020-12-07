<template>
  <div class="d-flex justify-center">
    <v-form ref="form" v-model="valid">
      <v-text-field
        v-model="vehicle.imageUrl"
        :rules="urlRules"
        :counter="300"
        auto-select-first
        autofocus
        label="Image Url"
      ></v-text-field>
      <v-autocomplete
        v-model="vehicle.make"
        :items="makes"
        :rules="[v => !!v || 'Make is required']"
        required
        label="Make"
        @change="onSelect(0)"
      ></v-autocomplete>
      <v-autocomplete
        v-model="vehicle.model"
        :items="models"
        :rules="[v => !!v || 'Model is required']"
        auto-select-first
        required
        label="Model"
        @change="onSelect(1)"
      ></v-autocomplete>
      <v-text-field
        v-model="vehicle.year"
        :rules="yearRules"
        label="Year"
        required
        @input="onSelect(2)"
      ></v-text-field>
      <v-text-field
        v-model="vehicle.nickname"
        label="Nickname"
        :rules="[v => !!v && v.length <= 25]"
        :counter="25"></v-text-field>
      <v-text-field
        v-model="vehicle.mileage"
        :rules="[
          v => !!v || 'Mileage is required',
          v => /^\d+$/.test(v) || 'Mileage must be a number'
        ]"
        label="Mileage"
        required
      ></v-text-field>
      <v-text-field
        v-model="vehicle.color"
        :rules="[
          v => !!v || 'Color is required',
          v => !!v && v.length <= 15
        ]"
        :counter="15"
        label="Color"
        required
      ></v-text-field>
      <v-select
        ref="transmission"
        v-model="vehicle.transmissionType"
        :items="transmissions"
        :rules="[v => !!v || 'Transmission is required']"
        clearable
        label="Transmission"
        required
      ></v-select>
      <v-select
        ref="energyType"
        v-model="vehicle.energyType"
        :items="energyTypes"
        :rules="[v => !!v || 'Energy Type is required']"
        clearable
        label="Energy Type"
        required
      ></v-select>
      <v-btn :disabled="!valid" color="success" class="mr-4" @click="submit">
        Edit Vehicle
      </v-btn>
    </v-form>
  </div>
</template>
<script>
import carTypes from "../static/vehicleTypes.json"
import copy from 'lodash'

export default {
  async beforeMount() {
    const preauth = await this.$store.dispatch('preAuthenticate')
    if (!this.$store.state.isLoggedIn) {
      this.$router.push('/')
    }
  },
  mounted() {
    // this.$refs.transmission.$refs.input.addEventListener(
    //   "focus",
    //   this.onTransmissionFocus,
    //   true
    // )
  },
  data: () => ({
    loading: false,
    valid: false,
    selection: 1,
    vehicle: null,
    makes: Object.keys(carTypes).sort(),
    transmissions: ["Automatic", "Manual"],
    energyTypes: ["Electric", "Gasoline", "Natural Gas"],
    yearRules: [
      v => !!v || "Year is required",
      v => /\d{4}/.test(v) || "Year must be valid"
    ],
    urlRules: [
      v => /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(v) || "Invalid URL",
      v => !!v && v.length <= 300
    ],
    oilDate: false,
    tireDate: false,
    registrationDate: false
  }),
  created() {
    let vehicleId = this.$store.state.vehicle.vehicleToEdit
    let veh = this.$store.state.vehicle.vehicles.filter(vehicle => {
      return vehicle.vehicleId.toString() === vehicleId.toString()
    })
    this.vehicle = copy.cloneDeep(veh[0])
  },
  methods: {
    reserve() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);
    },
    async submit() {
      await this.$store.dispatch('vehicle/editVehicle', this.vehicle)
      this.$router.push('/vehicles')
    },
    onSelect(value = null) {
      if (value === 0 && this.$refs.form.inputs[1].isDirty) {
        this.vehicle.model = "";
      }
      const inputs = this.$refs.form.inputs;
      if (value != null && inputs[value].validate()) {
        inputs[value].blur();
        if (value + 1 < inputs.length) {
          inputs[value + 1].focus();
        }
      }
    },
    onTransmissionFocus() {
      this.vehicle.transmission = "Automatic";
      this.$refs.transmission.value = "Automatic";
      this.$refs.transmission.isMenuActive = true;
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    }
  },
  computed: {
    models() {
      if (this.vehicle.make) {
        return carTypes[this.vehicle.make].sort();
      }
      return [];
    },
    oilDateFormatted() {
      return this.formatDate(this.vehicle.lastOilChangeDate);
    },
    tireDateFormatted() {
      return this.formatDate(this.vehicle.lastTireRotationDate);
    },
    registrationDateFormatted() {
      return this.formatDate(this.vehicle.lastRegistrationDate);
    }
  }
};
</script>
