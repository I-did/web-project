<script setup lang="ts">
withDefaults(defineProps<{ type?: 'error' | 'info' | 'success' }>(), { type: 'info' });
</script>
<template>
  <div class="message" :class="`message--${type}`" :role="type === 'error' ? 'alert' : 'status'"><slot /></div>
</template>
