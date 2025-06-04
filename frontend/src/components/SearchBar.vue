i

<template>
  <form @submit.prevent="onSubmit" class="flex gap-2">
    <input
      v-model="localKeyword"
      type="text"
      placeholder="검색어 입력"
      class="border rounded p-2 h-10"
    />
    <BaseButton :label="'검색'" />
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseButton from './BaseButton.vue'

const props = defineProps<{
  modelValue: string
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'submit'): void
}>()

const localKeyword = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newVal) => {
    localKeyword.value = newVal
  },
)

watch(localKeyword, (val) => {
  emit('update:modelValue', val)
})

const onSubmit = () => {
  emit('submit')
}
</script>
