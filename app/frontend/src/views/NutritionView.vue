<script setup lang="ts">
import { computed, ref } from 'vue';
import { useQuestionnaireStore } from '../stores/questionnaire';
import StatusMessage from '../components/ui/StatusMessage.vue';
const store = useQuestionnaireStore();
const week = ref(1);
const result = computed(() => store.result);
const plan = computed(() => result.value?.meal_plan);
const items = computed(() => (Array.isArray(plan.value) ? plan.value : []));
</script>
<template>
  <section class="nutrition-section container">
    <RouterLink to="/dashboard" class="back-link">← В личный кабинет</RouterLink>
    <div class="section-heading">
      <span class="eyebrow">ТВОЙ РАЦИОН</span>
      <h1>План питания</h1>
    </div>
    <div v-if="!result" class="empty-panel">
      <h2>План пока не сформирован</h2>
      <p>Для начала пройди анкету и получи свой расчёт.</p>
      <RouterLink to="/questionnaire" class="btn btn--primary">Заполнить анкету</RouterLink>
    </div>
    <template v-else
      ><div class="week-tabs" role="group" aria-label="Выбор недели">
        <button
          v-for="n in 4"
          :key="n"
          class="week-tab"
          :class="{ 'week-tab--active': week === n }"
          :aria-pressed="week === n"
          @click="week = n"
        >
          Неделя {{ n }}
        </button>
      </div>
      <div v-if="items.length" class="meal-list">
        <article v-for="(item, index) in items.slice((week - 1) * 35, week * 35)" :key="index" class="meal-item">
          <span class="meal-item__number">{{ String(index + 1).padStart(2, '0') }}</span>
          <div>
            <h3>
              {{ typeof item === 'object' && item !== null && 'name' in item ? String(item.name) : 'Приём пищи' }}
            </h3>
            <p>
              {{
                typeof item === 'object' && item !== null && 'calories' in item
                  ? `${item.calories} ккал`
                  : 'Из персонального плана'
              }}
            </p>
          </div>
        </article>
      </div>
      <StatusMessage v-else
        >Расчёт получен, но сервер не вернул список блюд в ожидаемом формате. Для отображения плана нужно согласовать
        структуру ответа meal_plan.</StatusMessage
      ></template
    >
  </section>
</template>
