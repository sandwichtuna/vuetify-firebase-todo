import Vue from 'vue';
import VueRouter from 'vue-router';
// import { component } from 'vue/types/umd';
// import Home from '../views/Home.vue';
import Todos from '../views/Todos.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Todos,
  },
  {
    path: '/todos',
    name: 'Todos',
    component: Todos,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
