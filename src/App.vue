<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <RouterLink to="/" class="nav-link"><h1>ShiftTracker</h1></RouterLink>
  </header>
  <RouterView />
</template>

<style>
header {
  padding: 10px;
  text-align: center;
  margin-bottom: 25px;
}
header a {
  text-decoration: none;
  color: black;
}

.loading {
  width: 100%;
  text-align: center;
  font-weight: 500;
  margin-top: 20px;
}

.loading > span {
  font-weight: 500;
}
</style>
