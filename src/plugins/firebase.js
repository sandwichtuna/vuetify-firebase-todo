import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import store from '../store';

require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.VUE_APP_APIKEY,
  authDomain: process.env.VUE_APP_AUTHDOMAIN,
  projectId: process.env.VUE_APP_PROJECTID,
  storageBucket: process.env.VUE_APP_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGINGSENDERID,
  appId: process.env.VUE_APP_APPID,
  measurementId: process.env.VUE_APP_MEASUREMENTID,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    store.state.user = user;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

export default db;
