import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
    { path: '/payment', name: 'payment', component: () => import('../views/PaymentView.vue') },
    { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
    { path: '/activate', name: 'activate', component: () => import('../views/ActivateView.vue') },
    {
      path: '/questionnaire',
      name: 'questionnaire',
      component: () => import('../views/QuestionnaireView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/nutrition',
      name: 'nutrition',
      component: () => import('../views/NutritionView.vue'),
      meta: { requiresAuth: true },
    },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFoundView.vue') },
  ],
});
router.beforeEach((to) => {
  if (to.meta.requiresAuth && !useAuthStore().isAuthenticated && import.meta.env.VITE_PREVIEW_MODE !== 'true')
    return { name: 'login', query: { redirect: to.fullPath } };
});
export default router;
