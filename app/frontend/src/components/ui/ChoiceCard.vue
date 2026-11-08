<script setup lang="ts">
defineProps<{ title: string; description?: string; selected: boolean; multiple?: boolean; disabled?: boolean }>();
defineEmits<{ select: [] }>();
</script>
<template>
  <button
    type="button"
    class="choice"
    :class="{ 'choice--selected': selected }"
    :disabled="disabled"
    :aria-pressed="selected"
    @click="$emit('select')"
  >
    <span class="choice__indicator" :class="{ 'choice__indicator--multiple': multiple }"
      ><span v-if="selected">✓</span></span
    ><span class="choice__body"
      ><strong>{{ title }}</strong
      ><small v-if="description">{{ description }}</small></span
    ><span class="choice__arrow" aria-hidden="true">›</span>
  </button>
</template>
