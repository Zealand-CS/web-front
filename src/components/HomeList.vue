<script setup lang="ts">
import type { UserAPI } from '@/api/users.api';
import HomeListItem from '../components/HomeListItem.vue';

interface HomeListProps {
  users: UserAPI[];
}
defineProps<HomeListProps>();
</script>

<template>
  <div class="listContainer">
    <table>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Id</th>
      </tr>
      <template v-for="user in users">
        <HomeListItem :user="user" />
      </template>
    </table>
  </div>
</template>

<style scoped>
.listContainer {
  width: 100%;
  display: flex;
  justify-content: center;
}

.listContainer > table {
  width: 800px;
  border-collapse: separate;
  border-spacing: 20px;
  text-align: left;
}

.listContainer > table th {
  padding-left: 20px;
}
</style>
