<script setup lang="ts">
import type { UserAPI } from '@/api/users.api';

interface HomeListItemProps {
  user: UserAPI;
}
defineProps<HomeListItemProps>();
</script>

<template>
  <tr class="listItem">
    <td>{{ `${user.firstName} ${user.lastName}` }}</td>
    <td>{{ user.email }}</td>
    <td>{{ user.id }}</td>
  </tr>
</template>

<style scoped>
.listItem {
}

.listItem > td {
}
</style>
