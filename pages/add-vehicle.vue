<template>
  <div class="d-flex justify-center">
    <v-form ref="form" v-model="valid">
      <v-autocomplete
        v-model="vehicle.make"
        :items="makes"
        :rules="[v => !!v || 'Make is required']"
        auto-select-first
        autofocus
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
      <v-text-field v-model="vehicle.nickname" label="Nickname"></v-text-field>
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
        :rules="[v => !!v || 'Color is required']"
        label="Color"
        required
      ></v-text-field>
      <v-select
        ref="transmission"
        v-model="vehicle.transmission"
        :items="transmissions"
        :rules="[v => !!v || 'Transmission is required']"
        clearable
        label="Transmission"
        required
      ></v-select>
      <v-menu
        v-model="oilDate"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="oilDateFormatted"
            label="Date of Last Oil Change"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="vehicle.lastOilChangeDate"
          no-title
          @input="oilDate = false"
        ></v-date-picker>
      </v-menu>
      <v-menu
        v-model="tireDate"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="tireDateFormatted"
            label="Date of Last Tire Rotation"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="vehicle.lastTireRotationDate"
          no-title
          @input="tireDate = false"
        ></v-date-picker>
      </v-menu>
      <v-menu
        v-model="registrationDate"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="registrationDateFormatted"
            label="Date of Last Registration"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="vehicle.lastRegistrationDate"
          no-title
          @input="registrationDate = false"
        ></v-date-picker>
      </v-menu>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="submit">
        Add Vehicle
      </v-btn>
    </v-form>
  </div>
</template>
<script>
import carTypes from "../static/vehicleTypes.json";
import { Vehicle } from "../types/vehicle.ts";
export default {
  mounted() {
    this.$store.dispatch('preAuthenticate')
    if (!this.$store.state.userAuthToken) {
      this.$router.push('/')
    }
    this.$refs.transmission.$refs.input.addEventListener(
      "focus",
      this.onTransmissionFocus,
      true
    )
  },
  data: () => ({
    loading: false,
    valid: false,
    selection: 1,
    vehicle: {},
    makes: Object.keys(carTypes).sort(),
    transmissions: ["Automatic", "Manual"],
    yearRules: [
      v => !!v || "Year is required",
      v => /\d{4}/.test(v) || "Year must be valid"
    ],
    oilDate: false,
    tireDate: false,
    registrationDate: false
  }),

  methods: {
    reserve() {
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
    submit() {
      this.$store.dispatch('vehicles/addVehicle', this.vehicle)
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
