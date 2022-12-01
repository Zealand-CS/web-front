<script setup lang="ts">
import Header from '../components/Header.vue';
import HomeList from '../components/HomeList.vue';
import {mock} from '../api/users.api'
</script>

<template>
  <div>
    <Header name="Adam" :age="96" />
    <h1>Home</h1>
    <HomeList :users="mock"/>
  </div>
</template>
