<script setup lang="ts">
import type { UserAPI } from '@/api/users.api';
import HomeListItem from './HomeListItem.vue';

interface HomeListProps {
  users: UserAPI[];
}
defineProps<HomeListProps>();
</script>

<template>
  <div>
    <template v-for="user in users">
      <HomeListItem :user="user" />
      <br />
    </template>
  </div>
</template>

<style scoped>
.header {
  width: 100%;
  height: 300px;
  background-color: aqua;
}
</style>
