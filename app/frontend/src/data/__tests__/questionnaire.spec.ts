import { describe, expect, it } from 'vitest';
import { visibleSteps, validationError, steps } from '../questionnaire';

describe('questionnaire configuration', () => {
  it('does not show breastfeeding unless selected female', () => {
    expect(visibleSteps({ gender: 'male' }).some((step) => step.id === 'breastfeeding_children')).toBe(false);
    expect(visibleSteps({ gender: 'female' }).some((step) => step.id === 'breastfeeding_children')).toBe(true);
  });
  it('shows only selected food subcategory questions', () => {
    const shown = visibleSteps({ excluded_categories: ['ryba'] }).map((step) => step.id);
    expect(shown).toContain('excluded_fish_products');
    expect(shown).not.toContain('excluded_meat_products');
  });
  it('validates all body parameters against documented boundaries', () => {
    const body = steps.find((step) => step.id === 'body');
    expect(body).toBeDefined();
    expect(validationError(body!, { current_weight: 70, desired_weight: 60, height: 170, age: 30 })).toBeNull();
    expect(validationError(body!, { current_weight: 20, desired_weight: 60, height: 170, age: 30 })).toContain('40');
  });
  it('prevents exceeding maximum exclusions', () => {
    const step = steps.find((step) => step.id === 'excluded_categories');
    expect(step).toBeDefined();
    expect(validationError(step!, { excluded_categories: ['a', 'b', 'c', 'd', 'e', 'f'] })).toContain('5');
  });
});
