<script setup lang="ts">
import type { UserAPI } from '@/api/users.api';

interface UserProps {
  user: UserAPI
}
defineProps<UserProps>();
</script>

<template>
    <div>
      <h1>User id is {{ user.id }}</h1>
      <label for="FirstName">FirstName: </label>
      <input type="text" id="FirstName" name="name" :value="user.firstName" disabled/>
      <label for="LastName">LastName: </label>
      <input type="text" id="LastName" name="lastname" :value="user.lastName" disabled />
  
      <label for="Email"> Email: </label>
      <input type="text" id="Email" name="email" :value="user.email" disabled/>
      <label for="ID"> Id: </label>
      <input type="text" id="ID" name="id" :value="user.id" disabled/>
      
      <span>
        <button>Update</button>
      </span>
    </div>
  </template>
  

<style scoped>

</style>
