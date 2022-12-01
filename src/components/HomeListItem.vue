<script setup lang="ts">
import type { UserAPI } from '@/api/users.api';

interface HomeListItemProps {
  user: UserAPI
}
defineProps<HomeListItemProps>();
</script>

<template>
    <div>
    <span>{{user.firstName}}</span>
    <span>{{user.firstName}}</span>
    <span>{{user.firstName}}</span>
    <span>{{user.firstName}}</span>
    </div>
</template>

<style scoped>

</style>
