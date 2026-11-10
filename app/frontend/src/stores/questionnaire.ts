import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { steps, visibleSteps, type QuestionnaireAnswers } from '../data/questionnaire';
import { nutritionApi, type NutritionResult } from '../services/nutrition';
import { useAuthStore } from './auth';

export const useQuestionnaireStore = defineStore('questionnaire', () => {
  const answers = ref<QuestionnaireAnswers>({});
  const currentId = ref(steps[0]?.id || 'goal');
  const loading = ref(false);
  const result = ref<NutritionResult | null>(null);
  const visible = computed(() => visibleSteps(answers.value));
  const index = computed(() =>
    Math.max(
      0,
      visible.value.findIndex((s) => s.id === currentId.value)
    )
  );
  const current = computed(() => visible.value[index.value]);
  const isLast = computed(() => index.value === visible.value.length - 1);
  function setAnswer(id: string, value: QuestionnaireAnswers[string]) {
    answers.value[id] = value;
    if (id === 'gender' && value !== 'female') delete answers.value.breastfeeding_children;
    if (id === 'excluded_categories') {
      const list = Array.isArray(value) ? value : [];
      const excludedCategories: [string, string][] = [
        ['myaso', 'excluded_meat_products'],
        ['molochnye-produkty', 'excluded_milk_products'],
        ['ryba', 'excluded_fish_products'],
      ];

      for (const [category, child] of excludedCategories) {
        if (!list.includes(category)) {
          delete answers.value[child];
        }
      }
    }
  }
  function next() {
    if (!isLast.value) currentId.value = visible.value[index.value + 1]?.id || currentId.value;
  }
  function back() {
    if (index.value > 0) currentId.value = visible.value[index.value - 1]?.id || currentId.value;
  }
  async function submit() {
    const auth = useAuthStore();
    if (!auth.accessToken) throw new Error('Для отправки анкеты необходимо войти в аккаунт.');
    loading.value = true;
    try {
      result.value = await nutritionApi.calculate(answers.value, auth.accessToken);
    } finally {
      loading.value = false;
    }
  }
  return { answers, currentId, loading, result, visible, index, current, isLast, setAnswer, next, back, submit };
});
