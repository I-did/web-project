import { request } from './http';
import type { QuestionnaireAnswers } from '../data/questionnaire';

export interface Macros {
  proteins: number;
  fats: number;
  carbs: number;
}
export interface NutritionResult {
  bmr?: number;
  tdee?: number;
  target_calories?: number;
  macros?: Macros;
  meal_plan?: unknown;
}
function unwrap<T>(value: T | { data: T }): T {
  return value && typeof value === 'object' && 'data' in value ? value.data : (value as T);
}
export const nutritionApi = {
  calculate: async (answers: QuestionnaireAnswers, token: string) =>
    unwrap(
      await request<NutritionResult | { data: NutritionResult }>(
        '/custom/calculate-nutrition',
        { method: 'POST', body: JSON.stringify(answers) },
        token
      )
    ),
  getMealPlans: async (token: string) =>
    unwrap(
      await request<{ data: unknown[] } | unknown[]>(
        '/items/meal_plans?fields=*,items.dishes_id.*&limit=1',
        { method: 'GET' },
        token
      )
    ),
};
