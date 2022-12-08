<script setup lang="ts">
import Header from '../components/Header.vue';
import UserComponent from '../components/UserComponent.vue';
import {mock} from '../api/users.api'
</script>

<template>
  <div>
    <UserComponent :user="mock[0]"></UserComponent>
  </div>
</template>
