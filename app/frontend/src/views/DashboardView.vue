<script setup lang="ts">
import { computed } from 'vue';
import { useQuestionnaireStore } from '../stores/questionnaire';
const questionnaire = useQuestionnaireStore();
const result = computed(() => questionnaire.result);
</script>
<template>
  <section class="dashboard-section container">
    <div class="dashboard-heading">
      <div>
        <span class="eyebrow">ЛИЧНЫЙ КАБИНЕТ</span>
        <h1>Твоя точка <em>опоры.</em></h1>
        <p>Здесь появится результат анкеты и твой план питания.</p>
      </div>
      <RouterLink class="btn btn--primary" to="/questionnaire"
        >{{ result ? 'Пройти анкету ещё раз' : 'Заполнить анкету' }} →</RouterLink
      >
    </div>
    <template v-if="result"
      ><div class="metrics">
        <article class="metric-card">
          <span>Целевая калорийность</span><strong>{{ Math.round(result.target_calories || 0) }}</strong
          ><small>ккал / день</small>
        </article>
        <article class="metric-card">
          <span>Белки</span><strong>{{ Math.round(result.macros?.proteins || 0) }}</strong
          ><small>г / день</small>
        </article>
        <article class="metric-card">
          <span>Жиры</span><strong>{{ Math.round(result.macros?.fats || 0) }}</strong
          ><small>г / день</small>
        </article>
        <article class="metric-card">
          <span>Углеводы</span><strong>{{ Math.round(result.macros?.carbs || 0) }}</strong
          ><small>г / день</small>
        </article>
      </div>
      <RouterLink class="dashboard-link" to="/nutrition">Открыть план питания <span>↗</span></RouterLink></template
    >
    <div v-else class="empty-panel">
      <span class="empty-panel__icon">◒</span>
      <h2>План начнётся здесь</h2>
      <p>Заполни анкету, чтобы получить рассчитанную норму КБЖУ и персональное питание на четыре недели.</p>
      <RouterLink to="/questionnaire" class="btn btn--primary">Перейти к анкете →</RouterLink>
    </div>
    <div class="upcoming-panel">
      <div>
        <span class="eyebrow">СКОРО</span>
        <h2>Больше способов видеть прогресс</h2>
        <p>Тренировки, замеры и фото-прогресс появятся в следующих итерациях проекта.</p>
      </div>
      <span class="upcoming-icon">✳</span>
    </div>
  </section>
</template>
