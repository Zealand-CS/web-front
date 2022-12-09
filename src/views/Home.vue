<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import HomeList from '../components/HomeList.vue';
import { mock, type UserAPI } from '@/api/users.api';

export default defineComponent({
  name: 'Home',
  components: {
    HomeList,
  },
  setup() {
    const users = ref<UserAPI[]>(mock);

    const idFilter = ref('');
    const emailFilter = ref('');
    const nameFilter = ref('');

    const searchResults = computed(() => {
      const filteredUsers = mock.filter(user => {
        return (
          user.id.toString().toLowerCase().includes(idFilter.value.toLowerCase()) &&
          user.email.toLowerCase().includes(emailFilter.value.toLowerCase()) &&
          (user.firstName.toLowerCase() + ' ' + user.lastName.toLowerCase()).includes(nameFilter.value.toLowerCase())
        );
      });

      return filteredUsers;
    });

    return { users, searchResults, idFilter, emailFilter, nameFilter };
  },
});
</script>

<template>
  <h1>Filters</h1>
  <div style="text-align: center">
    <div>
      <label>Name</label>
      <input class="filter-input" v-model="nameFilter" />

      <label>Email</label>
      <input class="filter-input" v-model="emailFilter" />

      <label>ID</label>
      <input class="filter-input-id" v-model="idFilter" />

      <label for="in-progress">In progress</label>
      <input type="checkbox" id="in-progress" />

      <button class="filter-input add-button">Add User</button>
    </div>
    <br>
    <hr>
    <HomeList :users="searchResults" />
  </div>
</template>

<style>
  .filter-input {
    border-radius: 10px;
    padding: 6px 10px;
    font-weight: 100;
  }
  .filter-input-id {
    border-radius: 10px;
    padding: 6px 20px;
    font-weight: 100;
    width: 60px;
  }
  
  label {
    margin-right: 10px;
    margin-left: 10px;
  }
  .add-button {
  border-color: green ;
  background-color: white;
  margin-left: 20px;
}
</style>





