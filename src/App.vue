<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { getQuote } from './api/quites.api';

export default defineComponent({
  name: 'Home',
  setup() {
    const quote = ref();
    onMounted(async () => (quote.value = await getQuote()));

    return { quote };
  },
});
</script>

<template>
  <header>
    <RouterLink to="/" class="nav-link"><h1>ShiftTracker</h1></RouterLink>
    <span>{{ quote }}</span>
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
