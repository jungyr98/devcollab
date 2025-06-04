<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div>
    <h1 class="green lg:text-left text-center">{{ msg }}</h1>
    <h3 class="lg:text-left text-center lg:text-xl text-lg">
      실시간 채팅과 게시판이 결합된 개발자 전용 협업 플랫폼. <br />
      팀원과 빠르게 소통하고, 아이디어를 공유하고, 함께 성장하세요.
      <!-- <a href="https://vite.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>. What's next? -->
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}
</style>
