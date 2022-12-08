<script setup lang="ts">
import Header from '../components/Header.vue';
import HomeList from '../components/HomeList.vue';
import FilterComponent from '../components/FilterComponent.vue';
import {mock} from '../api/users.api'



</script>
<template>
  <div>
    <h1>Home</h1>
    <!-- <HomeList :users="mock"/> -->
    <FilterComponent :data="mock"></FilterComponent>
    <HomeList :users="mock" />
    <!-- <Header name="Adam" :age="96" /> -->
  </div>
</template>
