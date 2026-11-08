export type Choice = { value: string; label: string; description?: string };
export type Step = {
  id: string;
  title: string;
  hint: string;
  type: 'single' | 'multiple' | 'numbers';
  options?: Choice[];
  fields?: Array<{ id: string; label: string; min: number; max: number; unit: string; placeholder: string }>;
  // Базовое правило ESLint ошибочно считает параметр типа TypeScript неиспользуемой переменной.
  // eslint-disable-next-line no-unused-vars
  showIf?: (answers: QuestionnaireAnswers) => boolean;
  optional?: boolean;
  maxSelected?: number;
};
export type Answer = string | string[] | number | undefined;
export type QuestionnaireAnswers = Record<string, Answer>;
const choice = (value: string, label: string, description?: string): Choice => ({ value, label, description });
export const steps: Step[] = [
  {
    id: 'goal',
    title: 'Какая у вас цель?',
    hint: 'Выберите, чего хотите достичь за время марафона.',
    type: 'single',
    options: [
      choice('weight-loss', 'Снизить вес', 'Постепенно изменить питание'),
      choice('weight-maintaining', 'Поддерживать вес', 'Сохранить привычную форму'),
      choice('weight-gain', 'Набрать массу', 'Повысить калорийность рациона'),
    ],
  },
  {
    id: 'gender',
    title: 'Укажите ваш пол',
    hint: 'Нужен для расчёта энергетической потребности.',
    type: 'single',
    options: [choice('female', 'Женский'), choice('male', 'Мужской')],
  },
  {
    id: 'body',
    title: 'Расскажите о себе',
    hint: 'Введите параметры в указанных единицах.',
    type: 'numbers',
    fields: [
      { id: 'current_weight', label: 'Текущий вес', unit: 'кг', min: 40, max: 200, placeholder: '70' },
      { id: 'desired_weight', label: 'Желаемый вес', unit: 'кг', min: 40, max: 200, placeholder: '65' },
      { id: 'height', label: 'Рост', unit: 'см', min: 120, max: 250, placeholder: '170' },
      { id: 'age', label: 'Возраст', unit: 'лет', min: 18, max: 70, placeholder: '30' },
    ],
  },
  {
    id: 'breastfeeding_children',
    title: 'Есть ли грудное вскармливание?',
    hint: 'Этот параметр учитывается при расчёте питания.',
    type: 'single',
    showIf: (a) => a.gender === 'female',
    options: [choice('y', 'Да'), choice('n', 'Нет')],
  },
  {
    id: 'training_experience',
    title: 'Ваш тренировочный опыт',
    hint: 'Как часто вы занимались раньше?',
    type: 'single',
    options: [
      choice('newbie', 'Начинаю заниматься'),
      choice('middle', 'Иногда тренируюсь'),
      choice('expert', 'Тренируюсь регулярно'),
    ],
  },
  {
    id: 'daily_activity',
    title: 'Сколько вы двигаетесь?',
    hint: 'Выберите описание, наиболее близкое к обычному дню.',
    type: 'single',
    options: [
      choice('inactive', 'Низкая активность', 'Сидячий образ жизни, около 2–3 тысяч шагов'),
      choice('medium-active', 'Умеренная активность', 'Прогулки и занятия 2–3 раза в неделю'),
      choice('high-active', 'Высокая активность', 'Много движения и регулярные нагрузки'),
    ],
  },
  {
    id: 'excluded_categories',
    title: 'Какие продукты исключить?',
    hint: 'Можно не выбирать ничего. При выборе категории уточним продукты далее.',
    type: 'multiple',
    optional: true,
    maxSelected: 5,
    options: [choice('myaso', 'Мясо'), choice('molochnye-produkty', 'Молочные продукты'), choice('ryba', 'Рыба')],
  },
  {
    id: 'excluded_meat_products',
    title: 'Какие мясные продукты исключить?',
    hint: 'Выберите конкретные виды или всю категорию.',
    type: 'multiple',
    showIf: (a) => Array.isArray(a.excluded_categories) && a.excluded_categories.includes('myaso'),
    options: [
      choice('all', 'Мясо полностью'),
      choice('govyadina-tyatina', 'Говядина / телятина'),
      choice('indeyka', 'Индейка'),
      choice('kuritsa', 'Курица'),
      choice('subprodukty', 'Субпродукты'),
    ],
  },
  {
    id: 'excluded_milk_products',
    title: 'Какие молочные продукты исключить?',
    hint: 'Можно исключить категорию целиком.',
    type: 'multiple',
    showIf: (a) => Array.isArray(a.excluded_categories) && a.excluded_categories.includes('molochnye-produkty'),
    options: [
      choice('all', 'Молочные продукты полностью'),
      choice('yogurt', 'Йогурт'),
      choice('kefir', 'Кефир'),
      choice('korovye-moloko', 'Коровье молоко'),
      choice('tvorog', 'Творог'),
    ],
  },
  {
    id: 'excluded_fish_products',
    title: 'Какую рыбу исключить?',
    hint: 'Выберите отдельные виды или всю категорию.',
    type: 'multiple',
    showIf: (a) => Array.isArray(a.excluded_categories) && a.excluded_categories.includes('ryba'),
    options: [
      choice('all', 'Рыбу полностью'),
      choice('ryba-belaya', 'Белая рыба'),
      choice('ryba-krasnaya', 'Красная рыба'),
    ],
  },
];
// После MVP: ограничения по тренировкам, место занятий, домашний инвентарь и проблемные зоны.
// Эти вопросы не входят в первую версию анкеты согласно docs/requirements/business.md.
export function visibleSteps(answers: QuestionnaireAnswers): Step[] {
  return steps.filter((step) => !step.showIf || step.showIf(answers));
}
export function validationError(step: Step, answers: QuestionnaireAnswers): string | null {
  if (step.type === 'numbers') {
    for (const field of step.fields || []) {
      const value = answers[field.id];
      if (value === undefined || value === '') return `Укажите «${field.label.toLowerCase()}».`;
      if (typeof value !== 'number' || !Number.isFinite(value) || value < field.min || value > field.max)
        return `${field.label}: допустимое значение от ${field.min} до ${field.max} ${field.unit}.`;
    }
    return null;
  }
  const value = answers[step.id];
  if (step.optional && (!value || (Array.isArray(value) && !value.length))) return null;
  if (step.type === 'multiple') {
    if (!Array.isArray(value) || !value.length) return 'Выберите хотя бы один вариант.';
    if (step.maxSelected && value.length > step.maxSelected)
      return `Можно выбрать не более ${step.maxSelected} вариантов.`;
  } else if (typeof value !== 'string' || !value) return 'Выберите один вариант.';
  return null;
}
