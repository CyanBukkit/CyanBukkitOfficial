// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/Home.vue'),
  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    component: () => import('../pages/Portfolio.vue'),
  },
  {
    path: '/plugin-works',
    name: 'PluginWorks',
    component: () => import('../pages/PluginWorks.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../pages/About.vue'),
  },
  {
    path: '/partners',
    name: 'Partners',
    component: () => import('../pages/Partners.vue'),
  },
  {
    path: '/finance',
    name: 'Finance',
    component: () => import('../pages/Finance.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;