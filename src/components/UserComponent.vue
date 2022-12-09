<script lang="ts">
export default {
  data() {
    return {
      showInputs: false, 
    }
  }
}
</script>

<script setup lang="ts">
import type { UserAPI } from '@/api/users.api';

interface UserProps {
  user: UserAPI
}
defineProps<UserProps>();
</script>

<template>
  <div>
    <h1>User</h1>

    <div style="text-align: center">
      <label for="Name">Name: </label>
      <label id="Name" name="name" :value="user.firstName + ' ' + user.lastName">{{ user.firstName + ' ' + user.lastName }}</label>

      <label for="Email"> Email: </label>
      <label id="Email" name="email" :value="user.email">{{ user.email }}</label>
      <label for="ID"> Id: </label>
      <label id="ID" name="id" :value="user.id">{{ user.id }}</label>
      <span>
        <button v-if="!showInputs" @click="showInputs = !showInputs" class="update-button button">Update</button>
      </span>
    </div>
    <br>
    <hr>
    <br>
    <div v-if="showInputs" style="text-align: center" >
      <label for="firstNameInput">First Name:</label>
      <input id="firstNameInput" v-model="user.firstName" class="update-input"/>
      <label for="lastNameInput">Last Name:</label>
      <input id="lastNameInput" v-model="user.lastName" class="update-input" />
      <label for="emailInput">Email:</label>
      <input id="emailInput" v-model="user.email" class="update-input"/>
      <span>
        <button @click="showInputs = !showInputs" class="update-button button">Update</button>
      </span>
    </div>
  </div>
</template>

<style scoped>
.update-button {
  border-color: green ;
  background-color: white;
  margin-left: 20px;
}
.button {
    border-radius: 10px;
    padding: 6px 10px;
    font-weight: 100;
  }
  .update-input {
    border-radius: 10px;
    padding: 6px 10px;
    font-weight: 100;
  }
</style>
