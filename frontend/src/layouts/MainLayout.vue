<template>
  <div class="flex flex-col min-h-screen w-full min-w-full">
    <!-- Header -->
    <BaseHeader />

    <!-- Main content -->
    <div class="flex flex-1">
      <!-- Sidebar -->
      <!-- <LeftSideBar class="w-64 bg-gray-100 p-4 border-r" /> -->

      <!-- Main page content -->
      <main class="flex-1 p-10 pl-50 pr-50 border-t overflow-y-auto">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import BaseHeader from '@/components/layout/BaseHeader.vue'
import LeftSideBar from '@/components/layout/LeftSideBar.vue'
</script>
