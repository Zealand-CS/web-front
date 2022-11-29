<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <div>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink :to="{ name: 'user', params: { id: 4 } }">User</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
