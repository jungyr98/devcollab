<template>
  <nav class="flex flex-col gap-3">
    <RouterLink to="/" class="text-gray-700 hover:text-blue-600"><House />홈</RouterLink>
    <RouterLink to="/post" class="text-gray-700 hover:text-blue-600"
      ><ClipboardPenLine /> 게시판</RouterLink
    >
    <RouterLink to="/" class="text-gray-700 hover:text-blue-600"><UserRound /> 내 정보</RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { House, ClipboardPenLine, UserRound } from 'lucide-vue-next'
</script>
