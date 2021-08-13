import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';
import 'firebase/auth';
import router from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
  },
  getters: {
    getUser(state) {
      return state.user;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    signInAction(context, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then((userCredential) => {
          // Signed in
          const { user } = userCredential;
          context.commit('setUser', user);
          router.push('/dashboard');
          // ...
        })
        .catch((error) => {
          // const errorCode = error.code;
          // const errorMessage = error.message;
          console.log(error);
        });
    },

    signOutAction(context) {
      firebase.auth().signOut().then(() => {
        // Sign-out successful.
        context.commit('setUser', null);
        router.push('/');
      }).catch((error) => {
        // An error happened.
        console.log(error);
      });
    },
  },
  modules: {
  },
});
