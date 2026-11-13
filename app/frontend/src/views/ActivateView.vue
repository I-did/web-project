<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { authApi } from '../services/auth';
import { errorMessage } from '../services/http';
import BaseButton from '../components/ui/BaseButton.vue';
import FieldInput from '../components/ui/FieldInput.vue';
import StatusMessage from '../components/ui/StatusMessage.vue';
const route = useRoute(),
  router = useRouter();
const token = computed(() => (typeof route.query.token === 'string' ? route.query.token : ''));
const password = ref(''),
  confirm = ref(''),
  busy = ref(false),
  error = ref(''),
  success = ref(false);
async function submit() {
  error.value = '';
  if (password.value.length < 8) {
    error.value = 'Пароль должен содержать не менее 8 символов.';
    return;
  }
  if (password.value !== confirm.value) {
    error.value = 'Пароли не совпадают.';
    return;
  }
  busy.value = true;
  try {
    await authApi.acceptInvite(token.value, password.value);
    success.value = true;
  } catch (e) {
    error.value = errorMessage(e);
  } finally {
    busy.value = false;
  }
}
</script>
<template>
  <section class="center-section">
    <div class="paper-card">
      <span class="eyebrow">ДОБРО ПОЖАЛОВАТЬ</span>
      <h1>Активация аккаунта</h1>
      <p>Придумайте пароль, чтобы получить доступ к личному кабинету КБЖУ.</p>
      <StatusMessage v-if="!token" type="error"
        >Ссылка приглашения недействительна: отсутствует токен активации.</StatusMessage
      ><template v-else-if="success"
        ><StatusMessage type="success">Аккаунт активирован. Теперь можно войти.</StatusMessage
        ><BaseButton @click="router.push('/login')">Перейти ко входу</BaseButton></template
      >
      <form v-else @submit.prevent="submit">
        <FieldInput
          id="activate-password"
          v-model="password"
          label="Пароль"
          type="password"
          autocomplete="new-password"
          required
        /><FieldInput
          id="activate-confirm"
          v-model="confirm"
          label="Повторите пароль"
          type="password"
          autocomplete="new-password"
          required
        /><StatusMessage v-if="error" type="error">{{ error }}</StatusMessage
        ><BaseButton type="submit" :loading="busy">Активировать</BaseButton>
      </form>
    </div>
  </section>
</template>
