<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary';
    disabled?: boolean;
    loading?: boolean;
    type?: 'button' | 'submit';
  }>(),
  { variant: 'primary', type: 'button' }
);
</script>
<template>
  <button class="btn" :class="`btn--${variant}`" :type="type" :disabled="disabled || loading">
    <span v-if="loading" class="spinner" aria-hidden="true"></span><slot />
  </button>
</template>
