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
      <RouterLink to="/" class="brand" aria-label="Форма — главная"
        ><span class="brand__symbol">✳</span><span>форма<span class="brand__dot">.</span></span></RouterLink
      >
      <nav class="main-nav" aria-label="Основная навигация">
        <RouterLink to="/" exact-active-class="is-active">Главная</RouterLink
        ><RouterLink to="/questionnaire" active-class="is-active">Анкета</RouterLink
        ><RouterLink to="/dashboard" active-class="is-active">Кабинет</RouterLink>
      </nav>
      <div class="header-actions">
        <button v-if="auth.isAuthenticated" class="text-button" @click="logout">Выйти</button
        ><RouterLink v-else class="header-login" to="/login">Войти <span aria-hidden="true">↗</span></RouterLink>
      </div>
    </div>
  </header>
</template>
