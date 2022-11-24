<script setup lang="ts">
interface HeaderProps {
  name: string;
  age: number;
}
defineProps<HeaderProps>();
</script>

<template>
  <div class="header">{{ `name is ${name} age is ${age}` }}</div>
</template>

<style scoped>
.header {
  width: 100%;
  height: 300px;
  background-color: aqua;
}
</style>
