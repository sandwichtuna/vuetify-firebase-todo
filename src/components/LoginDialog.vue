<template>
  <v-dialog transition="dialog-bottom-transition" max-width="700" v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn text v-bind="attrs" v-on="on"
        ><span class="text-body-1">Login</span>
        <v-icon right>mdi-login-variant</v-icon>
      </v-btn>
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-row justify="center">
          <v-col cols="12">
            <v-toolbar color="primary" dark>Login</v-toolbar>
          </v-col>
          <v-col cols="12"></v-col>
          <v-col cols="10">
            <v-text-field
              solo
              label="email"
              prepend-icon="mdi-account"
              v-model="user.email"
            ></v-text-field>
          </v-col>
          <v-col cols="10">
            <v-text-field
              solo
              label="password"
              type="password"
              prepend-icon="mdi-lock"
              v-model="user.password"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-card-actions class="justify-space-around">
              <v-btn color="primary" @click="signIn">
                Login
              </v-btn>
              <v-btn color="error" @click="dialog.value=false"> Clear </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import store from '../store';

export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      dialog: false,
    };
  },

  methods: {
    clear() {
      this.user.email = '';
      this.user.password = '';
      // this.$router.push('/todos');
    },

    signIn() {
      store.dispatch('signInAction', this.user).then(() => {
        this.dialog = false;
      });
    },

  },
};
</script>

<style>
</style>
