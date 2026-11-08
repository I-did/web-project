<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuestionnaireStore } from '../stores/questionnaire';
import { validationError } from '../data/questionnaire';
import ChoiceCard from '../components/ui/ChoiceCard.vue';
import FieldInput from '../components/ui/FieldInput.vue';
import BaseButton from '../components/ui/BaseButton.vue';
import StatusMessage from '../components/ui/StatusMessage.vue';
import { errorMessage } from '../services/http';
const store = useQuestionnaireStore();
const router = useRouter();
const error = ref('');
const submissionError = ref('');
const current = computed(() => store.current);
const selected = computed(() => store.answers[current.value?.id || '']);
const progress = computed(() => Math.round(((store.index + 1) / store.visible.length) * 100));
function choose(value: string) {
  if (!current.value) return;
  error.value = '';
  if (current.value.type === 'single') {
    store.setAnswer(current.value.id, value);
    void next();
  } else {
    const previous = Array.isArray(selected.value) ? [...selected.value] : [];
    const nextValues =
      value === 'all'
        ? ['all']
        : previous.includes(value)
          ? previous.filter((x) => x !== value)
          : [...previous.filter((x) => x !== 'all'), value];
    if (current.value.maxSelected && nextValues.length > current.value.maxSelected) {
      error.value = `Можно выбрать не более ${current.value.maxSelected} вариантов.`;
      return;
    }
    store.setAnswer(current.value.id, nextValues);
  }
}
function updateField(id: string, value: string | number) {
  store.setAnswer(id, value === '' ? undefined : value);
  error.value = '';
}
async function next() {
  if (!current.value) return;
  const message = validationError(current.value, store.answers);
  if (message) {
    error.value = message;
    return;
  }
  error.value = '';
  if (!store.isLast) {
    store.next();
    return;
  }
  submissionError.value = '';
  try {
    await store.submit();
    await router.push('/dashboard');
  } catch (e) {
    submissionError.value = errorMessage(e);
  }
}
function back() {
  error.value = '';
  submissionError.value = '';
  store.back();
}
</script>
<template>
  <section class="wizard-section">
    <div class="container wizard-container">
      <div class="wizard-top">
        <RouterLink to="/" class="back-link">← На главную</RouterLink
        ><span class="wizard-top__caption">ТВОЙ ПЕРСОНАЛЬНЫЙ ПЛАН</span>
      </div>
      <div class="wizard-progress">
        <div class="wizard-progress__label">
          <span>АНКЕТА</span><span>Шаг {{ store.index + 1 }} из {{ store.visible.length }}</span>
        </div>
        <div class="progress-track" role="progressbar" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100">
          <div :style="{ width: progress + '%' }"></div>
        </div>
      </div>
      <div v-if="current" class="wizard-card">
        <span class="eyebrow">ШАГ {{ String(store.index + 1).padStart(2, '0') }}</span>
        <h1>{{ current.title }}</h1>
        <p class="wizard-hint">{{ current.hint }}</p>
        <div v-if="current.type === 'numbers'" class="field-grid">
          <FieldInput
            v-for="field in current.fields"
            :id="field.id"
            :key="field.id"
            :label="field.label"
            type="number"
            required
            :model-value="store.answers[field.id] ?? ''"
            :placeholder="field.placeholder"
            :min="field.min"
            :max="field.max"
            :unit="field.unit"
            @update:model-value="(v) => updateField(field.id, v)"
          />
        </div>
        <div v-else class="choices">
          <ChoiceCard
            v-for="option in current.options"
            :key="option.value"
            :title="option.label"
            :description="option.description"
            :selected="
              current.type === 'multiple'
                ? Array.isArray(selected) && selected.includes(option.value)
                : selected === option.value
            "
            :multiple="current.type === 'multiple'"
            :disabled="store.loading"
            @select="choose(option.value)"
          />
        </div>
        <StatusMessage v-if="error" type="error">{{ error }}</StatusMessage
        ><StatusMessage v-if="submissionError" type="error">{{ submissionError }}</StatusMessage>
        <div class="wizard-actions">
          <button class="back-link" :disabled="store.index === 0 || store.loading" @click="back">← Назад</button
          ><BaseButton v-if="current.type !== 'single'" :loading="store.loading" @click="next"
            >{{ store.isLast ? 'Получить мой план' : 'Продолжить' }} <span aria-hidden="true">→</span></BaseButton
          ><span v-else class="wizard-auto">Нажмите на вариант, чтобы продолжить →</span>
        </div>
      </div>
      <p class="wizard-footnote">Ваши ответы отправляются на сервер только после завершения анкеты.</p>
    </div>
  </section>
</template>
