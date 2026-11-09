<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { errorMessage } from '../services/http';
import FieldInput from '../components/ui/FieldInput.vue';
import BaseButton from '../components/ui/BaseButton.vue';
import StatusMessage from '../components/ui/StatusMessage.vue';
const email = ref('');
const password = ref('');
const error = ref('');
const auth = useAuthStore();
const router = useRouter();
const route = useRoute();
async function submit() {
  error.value = '';
  try {
    await auth.login(email.value, password.value);
    await router.replace(
      typeof route.query.redirect === 'string' &&
        route.query.redirect.startsWith('/') &&
        !route.query.redirect.startsWith('//')
        ? route.query.redirect
        : '/dashboard'
    );
  } catch (e) {
    error.value = errorMessage(e);
  }
}
</script>
<template>
  <section class="auth-section">
    <div class="auth-aside">
      <span class="eyebrow">СНОВА ВМЕСТЕ</span>
      <h2>Каждый день —<br /><em>маленький шаг</em><br />к себе.</h2>
      <div class="auth-art">✳</div>
    </div>
    <div class="auth-content">
      <div class="auth-form">
        <span class="eyebrow">ЛИЧНЫЙ КАБИНЕТ</span>
        <h1>С возвращением!</h1>
        <p>Войдите с помощью данных, которые вы указали при активации аккаунта.</p>
        <form @submit.prevent="submit">
          <FieldInput
            id="login-email"
            v-model="email"
            label="Электронная почта"
            type="email"
            autocomplete="email"
            placeholder="name@example.ru"
            required
          /><FieldInput
            id="login-password"
            v-model="password"
            label="Пароль"
            type="password"
            autocomplete="current-password"
            placeholder="Ваш пароль"
            required
          /><StatusMessage v-if="error" type="error">{{ error }}</StatusMessage
          ><BaseButton type="submit" :loading="auth.loading">Войти в кабинет <span>→</span></BaseButton>
        </form>
        <p class="auth-note">Ещё нет аккаунта? <RouterLink to="/payment">Начните с оформления участия</RouterLink>.</p>
      </div>
    </div>
  </section>
</template>
