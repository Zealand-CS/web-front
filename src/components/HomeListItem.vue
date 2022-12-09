<script setup lang="ts">
import type { UserAPI } from '@/api/users.api';

interface HomeListItemProps {
  user: UserAPI;
}
defineProps<HomeListItemProps>();
</script>

<template>
  <tr class="listItem">
    <td>
      <RouterLink :to="{ name: 'user', params: { id: user.id } }">{{
        `${user.firstName} ${user.lastName}`
      }}</RouterLink>
    </td>
    <td>{{ user.email }}</td>
    <td>{{ user.id }}</td>
    <td><span>&#x2718;</span></td>
  </tr>
</template>

<style scoped>
.listItem {
  /* line-height: 40px; */
  /* height: 50px; */

  border-radius: 10px;
  box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.25);
}

.listItem > td {
  padding: 16px 20px;
  font-weight: 500;
}
</style>
