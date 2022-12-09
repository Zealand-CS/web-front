<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <div>
      <nav>
        <RouterLink to="/" class="nav-link">Home</RouterLink>
        <!-- <RouterLink :to="{ name: 'user', params: { id: 4 } }" class="nav-link">User</RouterLink> -->
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style>
  .nav-link {
    font-size: 20px;
    font-weight: bold;
    color: #333;
    margin-right: 10px;
  }

  .nav-link:last-child {
    margin-right: 0;
  }

  .nav-link:hover,
  .nav-link.active {
    color: #000;
  }
</style>
