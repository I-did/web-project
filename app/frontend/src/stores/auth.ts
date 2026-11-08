import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { authApi } from '../services/auth';

// Токен доступа хранится только в памяти приложения, без записи в localStorage.
export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<string | null>(null);
  const loading = ref(false);
  const isAuthenticated = computed(() => !!accessToken.value);
  async function login(email: string, password: string) {
    loading.value = true;
    try {
      const response = await authApi.login(email, password);
      accessToken.value = response.data.access_token;
    } finally {
      loading.value = false;
    }
  }
  function logout() {
    accessToken.value = null;
  }
  return { accessToken, loading, isAuthenticated, login, logout };
});
