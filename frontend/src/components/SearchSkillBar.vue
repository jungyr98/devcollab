<template>
  <div class="relative w-full mb-2">
    <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-5" />
    <multiselect
      v-model="selectedSkills"
      :options="skills"
      :multiple="true"
      :close-on-select="false"
      :clear-on-select="true"
      :preserve-search="true"
      :searchable="true"
      :taggable="true"
      :limit="5"
      placeholder="찾으시는 스킬을 입력해주세요"
      label="name"
      track-by="id"
      hide-selected="true"
      class="pl-8 border rounded p-2 ml-2 h-10 relative"
    >
      <!-- 🎨 선택된 태그 UI 커스터마이징 -->
      <template #tag="{ option, remove }">
        <span
          class="bg-blue-100 text-blue-800 text-sm font-medium mr-1 mb-1 px-2.5 py-0.5 rounded-full inline-flex items-center"
        >
          {{ option.name }}
          <button
            type="button"
            @click="remove(option)"
            class="ml-2 text-blue-600 hover:text-red-600 focus:outline-none"
          >
            ×
          </button>
        </span>
      </template>
      <template #noResult>
        <span>태그를 찾을 수 없습니다.</span>
      </template>
    </multiselect>
  </div>
</template>

<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import Multiselect from 'vue-multiselect'
import { ref, onMounted } from 'vue'
import { fetchSkills } from '@/api/skill'

type Skill = { id: number; name: string }

const selectedSkills = ref<Skill[]>([])
const skills = ref<Skill[]>([])
let skillIdCounter = 1000 // 새 항목 ID용 (임시로 클라이언트에서 관리)

onMounted(async () => {
  const res = await fetchSkills() // NestJS 백엔드로부터 스킬 목록 가져오기
  skills.value = res.data
})
</script>

<style scoped>
/* @import 'vue-multiselect/dist/vue-multiselect.min.css'; */

/* 입력란 테두리 제거 */
:deep(.multiselect__input) {
  outline: none;
  box-shadow: none;
  border: none;
  margin-bottom: 5px;
}

/* focus 상태까지 명시적으로 제거 */
/* :deep(.multiselect__input:focus) {
  outline: none !important;
  box-shadow: none !important;
  border: none !important;
} */

:deep(.multiselect__select) {
  line-height: 16px;
  display: block;
  position: absolute;
  box-sizing: border-box;
  width: 40px;
  height: 38px;
  right: 1px;
  top: 1px;
  padding: 4px 8px;
  margin: 0;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease;
}

:deep(.multiselect__tags) {
  display: block;
  border-radius: 5px;
  font-size: 14px;
}

:deep(.multiselect__content-wrapper) {
  position: absolute !important;
  z-index: 50;
  width: 100%;
  max-height: 220px;
  overflow-y: auto;
  border-radius: 0.5rem;
  background-color: #f9fafb;
  border: 1px solid #d1d5db;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0.5rem;
  transition: all 0.2s ease-in-out;
  color: black;
  left: -3px;
}
</style>
