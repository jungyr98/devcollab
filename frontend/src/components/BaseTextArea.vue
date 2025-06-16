<template>
  <div class="w-full my-2">
    <textarea
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
      class="w-full border rounded px-3 py-1.5 mb-2 leading-8 min-h-48 focus:outline-none focus:ring-2 focus:ring-blue-400"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

function onInput(event: Event) {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}
</script>
