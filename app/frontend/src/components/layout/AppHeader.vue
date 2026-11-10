<script setup lang="ts">
import { useAuthStore } from '../../stores/auth';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();

function logout() {
  auth.logout();
  void router.push('/login');
}
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <RouterLink to="/" class="brand">КБЖУ</RouterLink>
      <nav class="main-nav" aria-label="Основная навигация">
        <RouterLink to="/">Главная</RouterLink>
        <RouterLink to="/questionnaire">Анкета</RouterLink>
        <RouterLink to="/dashboard">Личный кабинет</RouterLink>
      </nav>
      <button v-if="auth.isAuthenticated" class="text-button" @click="logout">Выйти</button>
      <RouterLink v-else to="/login" class="header-login">Войти</RouterLink>
    </div>
  </header>
</template>
