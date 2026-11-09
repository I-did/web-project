<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: string | number;
    label: string;
    id: string;
    type?: string;
    placeholder?: string;
    min?: number;
    max?: number;
    unit?: string;
    autocomplete?: string;
    required?: boolean;
  }>(),
  { type: 'text', placeholder: '', min: undefined, max: undefined, unit: '', autocomplete: '' }
);
const emit = defineEmits<{ 'update:modelValue': [value: string | number] }>();
function update(event: Event) {
  const raw = (event.target as HTMLInputElement).value;
  emit('update:modelValue', props.type === 'number' && raw !== '' ? Number(raw) : raw);
}
</script>
<template>
  <label class="field" :for="id"
    ><span class="field__label">{{ label }} <span v-if="required" aria-hidden="true">*</span></span
    ><span class="field__wrap"
      ><input
        :id="id"
        :value="modelValue"
        :type="type"
        :placeholder="placeholder"
        :min="min"
        :max="max"
        :autocomplete="autocomplete"
        :required="required"
        @input="update"
      /><span v-if="unit" class="field__unit">{{ unit }}</span></span
    ></label
  >
</template>
