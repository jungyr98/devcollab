<!-- BaseInput.vue -->
<template>
  <div class="w-full my-2">
    <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
      class="w-full border rounded px-3 py-1.5 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
  placeholder?: string
  type?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>
