<template>
  <v-app dark>
    <v-navigation-drawer
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
   data() {
      return {
         clipped: false,
         drawer: false,
         fixed: false,
         items: [
            {
               icon: "mdi-login",
               title: "Login",
               to: "/"
            },
            {
               icon: "mdi-car",
               title: "Vehicles",
               to: "/vehicles"
            },
            {
               icon: "mdi-plus-circle",
               title: "Add Vehicle",
               to: "/add-vehicle"
            },
            {
               icon: "mdi-exit-run",
               title: "Logout",
               to: "/logout"
            }
         ],
         miniVariant: false,
         right: true,
         rightDrawer: false,
         title: "Vehicle Maintenance Tracker"
      }
   }
}
</script>
