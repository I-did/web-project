<script setup>
import { ref, onMounted } from 'vue';
import { createDirectus, rest, readItems } from '@directus/sdk';

// Инициализация клиента (лучше вынести в отдельный файл)
const directus = createDirectus('http://localhost:8080/').with(rest());

const dishes = ref([]);
const loading = ref(false);
const error = ref(null);

const fetchDishes = async () => {
  loading.value = true;
  try {
    // Запрос к коллекции 'dishes'
    const result = await directus.request(
      readItems('dishes', {
        fields: [
          'id',
          'name',
          'recipe',
          'calories',
          'ingredients.ingredient_id.name',
          'dish_types.dish_types_id.name',
          'dish_targets.dish_targets_id.name',
          'dish_categories.dish_categories_id.name',
          'ingredients.ingredient_id.id',
          'dish_types.dish_types_id.id',
          'dish_targets.dish_targets_id.id',
          'dish_categories.dish_categories_id.id',
        ],
      })
    );
    dishes.value = result;
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchDishes);
</script>

<template>
  <div>
    <p v-if="loading">Загрузка...</p>
    <p v-else-if="error">Ошибка: {{ error.message }}</p>
    <ol v-else>
      <li v-for="dish in dishes" :key="dish.id">
        <p>Название:<br />{{ dish.name }}</p>
        <p>Рецепт:<br />{{ dish.recipe }}</p>
        <p>Калорийность: {{ dish.calories }}</p>
        <div>
          Ингредиенты:
          <ul>
            <li v-for="ingredient in dish.ingredients" :key="ingredient.ingredient_id.id">
              {{ ingredient.ingredient_id.name }}
            </li>
          </ul>
        </div>
        <div>
          Подходит для цели:
          <ul>
            <li v-for="dish_target in dish.dish_targets" :key="dish_target.dish_targets_id.id">
              {{ dish_target.dish_targets_id.name }}
            </li>
          </ul>
        </div>
        <div>
          Подходит для приема пищи:
          <ul>
            <li v-for="dish_type in dish.dish_types" :key="dish_type.dish_types_id.id">
              {{ dish_type.dish_types_id.name }}
            </li>
          </ul>
        </div>
        <div>
          Категории:
          <ul>
            <li v-for="dish_category in dish.dish_categories" :key="dish_category.dish_categories_id.id">
              {{ dish_category.dish_categories_id.name }}
            </li>
          </ul>
        </div>
      </li>
    </ol>
  </div>
</template>
