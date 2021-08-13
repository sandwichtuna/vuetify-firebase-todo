<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <!-- <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        /> -->
      </div>

      <v-spacer></v-spacer>
      <div><LoginDialog /></div>
    </v-app-bar>

    <v-navigation-drawer
      color="blue darken-4"
      v-model="drawer"
      absolute
      temporary
    >
      <v-list>
        <v-list-item-group v-model="group">
          <v-list-item
            v-for="link in links"
            :key="link.name"
            route
            :to="link.route"
          >
            <v-icon left class="white--text">{{ link.icon }}</v-icon>
            <v-list-item-title class="white--text">{{
              link.name
            }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block text dark>
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main class="mt-4">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import LoginDialog from './components/LoginDialog.vue';

export default {
  name: 'App',

  data: () => ({
    links: [
      { name: 'Dashboard', icon: 'mdi-view-dashboard', route: '/' },
      { name: 'About', icon: 'mdi-information-outline', route: '/about' },
      { name: 'Admin', icon: 'mdi-account-supervisor', route: '/admin' },
    ],
    drawer: false,
    group: null,
  }),
  watch: {
    group() {
      this.drawer = false;
    },
  },
  components: {
    LoginDialog,
  },
};
</script>
