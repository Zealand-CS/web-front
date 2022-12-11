<script setup lang="ts">
import type { UserAPI } from '@/api/users.api';
import UserListItem from './UserListItem.vue';

interface HomeListProps {
  users: UserAPI[] | undefined;
}
defineProps<HomeListProps>();
</script>

<template>
  <div class="tableContainer">
    <table>
      <tr>
        <th>CheckIn</th>
        <th>CheckOut</th>
        <th>Time in Total</th>
        <th>Id</th>
        <th>Status</th>
      </tr>
      <template v-for="user in users">
        <UserListItem :user="user" />
      </template>
    </table>
  </div>
</template>

<style scoped>
.tableContainer {
  width: 100%;
  display: flex;
  justify-content: center;
}

.tableContainer > table {
  width: 800px;
  border-collapse: separate;
  border-spacing: 20px;
  text-align: left;
  /* table-layout: auto; */
}

.tableContainer > table > tr {
}

.tableContainer > table th {
  padding-left: 20px;
}
</style>
