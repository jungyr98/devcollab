<template>
  <div class="relative w-49/100 mb-2">
    <slot name="icon" />
    <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
      class="w-full my-2 border rounded pl-10 pr-4 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
