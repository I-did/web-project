<script setup lang="ts">
import { ref } from 'vue';
import FieldInput from '../components/ui/FieldInput.vue';
import BaseButton from '../components/ui/BaseButton.vue';
import StatusMessage from '../components/ui/StatusMessage.vue';
import { ordersApi } from '../services/orders';
import { errorMessage } from '../services/http';
/* Базовое правило ESLint некорректно проверяет объявления типов TypeScript. */
/* eslint-disable no-unused-vars */
declare global {
  interface Window {
    cp?: {
      CloudPayments: new () => {
        pay: (
          type: string,
          options: Record<string, unknown>,
          callbacks: Record<string, (...args: unknown[]) => void>
        ) => void;
      };
    };
  }
}
/* eslint-enable no-unused-vars */
const name = ref(''),
  email = ref(''),
  consent = ref(false),
  busy = ref(false),
  error = ref(''),
  success = ref(false);
function loadWidget(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.cp?.CloudPayments) {
      resolve();
      return;
    }
    const existing = document.querySelector<HTMLScriptElement>('script[data-cloudpayments]');
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error('Не удалось загрузить платёжный виджет.')), {
        once: true,
      });
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://widget.cloudpayments.ru/bundles/cloudpayments.js';
    script.dataset.cloudpayments = 'true';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Не удалось загрузить платёжный виджет.'));
    document.head.appendChild(script);
  });
}
async function submit() {
  error.value = '';
  success.value = false;
  if (!consent.value) {
    error.value = 'Подтвердите согласие на обработку данных.';
    return;
  }
  if (!import.meta.env.VITE_CLOUDPAYMENTS_PUBLIC_ID) {
    error.value = 'Оплата ещё не настроена. Добавьте VITE_CLOUDPAYMENTS_PUBLIC_ID в .env.';
    return;
  }
  busy.value = true;
  try {
    const order = await ordersApi.create(name.value, email.value);
    if (!order.invoice_id || !Number.isFinite(order.amount)) throw new Error('Сервер вернул некорректный заказ.');
    await loadWidget();
    const widget = window.cp?.CloudPayments;
    if (!widget) throw new Error('Платёжный виджет недоступен.');
    new widget().pay(
      'charge',
      {
        publicId: import.meta.env.VITE_CLOUDPAYMENTS_PUBLIC_ID,
        description: 'Участие в фитнес-марафоне',
        amount: order.amount / 100,
        currency: 'RUB',
        invoiceId: order.invoice_id,
      },
      {
        onSuccess: () => {
          void (async () => {
            try {
              const verification = await ordersApi.verify(order.invoice_id);
              if (verification.status !== 'paid') throw new Error('Оплата пока не подтверждена сервером.');
              success.value = true;
            } catch (e) {
              error.value = errorMessage(e);
            } finally {
              busy.value = false;
            }
          })();
        },
        onFail: () => {
          error.value = 'Платёж не завершён. Попробуйте ещё раз.';
          busy.value = false;
        },
        onComplete: () => {
          busy.value = false;
        },
      }
    );
  } catch (e) {
    error.value = errorMessage(e);
    busy.value = false;
  }
}
</script>
<template>
  <section class="payment-section container">
    <div class="payment-intro">
      <span class="eyebrow">ТВОЙ НОВЫЙ МАРШРУТ</span>
      <h1>Начнём с<br /><em>первого шага.</em></h1>
      <p>Оформите участие, и после подтверждения оплаты вы получите приглашение для входа.</p>
      <div class="payment-benefits">
        <div>✓ План питания на четыре недели</div>
        <div>✓ Персональный расчёт КБЖУ</div>
        <div>✓ Удобный личный кабинет</div>
      </div>
    </div>
    <div class="paper-card payment-card">
      <span class="eyebrow">ОФОРМЛЕНИЕ УЧАСТИЯ</span>
      <h2>Ваши данные</h2>
      <p>Они нужны, чтобы оформить заказ и отправить приглашение.</p>
      <StatusMessage v-if="success" type="success"
        >Оплата подтверждена. Ожидайте письмо с приглашением от менеджера.</StatusMessage
      >
      <form v-else @submit.prevent="submit">
        <FieldInput
          id="pay-name"
          v-model="name"
          label="Имя и фамилия"
          placeholder="Анна Иванова"
          autocomplete="name"
          required
        /><FieldInput
          id="pay-email"
          v-model="email"
          label="Электронная почта"
          type="email"
          autocomplete="email"
          placeholder="name@example.ru"
          required
        /><label class="checkbox-line"
          ><input v-model="consent" type="checkbox" required /><span
            >Я согласен(на) на обработку персональных данных</span
          ></label
        ><StatusMessage v-if="error" type="error">{{ error }}</StatusMessage
        ><BaseButton type="submit" :loading="busy">Перейти к оплате ↗</BaseButton
        ><span class="form-footnote">Безопасная оплата через CloudPayments. Сумма поступает с сервера.</span>
      </form>
    </div>
  </section>
</template>
