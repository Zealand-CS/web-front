<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import HomeList from '../components/HomeList.vue';
import { getAllUsers, addUser, deleteUser, type UserAPI, type NewUser } from '@/api/users.api';

const NEW_USER_EMPTY = {
  firstName: '',
  lastName: '',
  email: '',
};

export default defineComponent({
  name: 'Home',
  components: {
    HomeList,
  },
  setup() {
    const result = ref<UserAPI[] | undefined>();

    onMounted(async () => (result.value = await getAllUsers()));

    const showAddUserSection = ref(false);

    const userFilter = ref({
      id: '',
      name: '',
      email: '',
    });

    const newUser = ref<NewUser>(NEW_USER_EMPTY);

    const searchResults = computed(() => {
      const filteredUsers = result.value?.filter(user => {
        return (
          user.id.toString().toLowerCase().includes(userFilter.value.id.toLowerCase()) &&
          user.email.toLowerCase().includes(userFilter.value.email.toLowerCase()) &&
          (user.firstName.toLowerCase() + ' ' + user.lastName.toLowerCase()).includes(
            userFilter.value.name.toLowerCase()
          )
        );
      });

      return filteredUsers;
    });

    const addNewUser = async () => {
      const user = await addUser(newUser.value);
      if (!user) {
        return;
      }
      result.value?.push(user);
      newUser.value = {
        firstName: '',
        lastName: '',
        email: '',
      };
      showAddUserSection.value = false;
    };

    const removeUser = async (userId: number) => {
      console.log('userid is: ' + userId);
      const deletedUser = await deleteUser(userId);
      if (!deletedUser) {
        return;
      }
      result.value = result.value?.filter(user => user.id !== deletedUser.id);
    };

    return { searchResults, userFilter, showAddUserSection, newUser, addNewUser, removeUser, result };
  },
});
</script>

<template>
  <div class="container">
    <div class="headingWrapper">
      <h2>Filters</h2>
    </div>
    <div class="filters">
      <div>
        <div>
          <label>Name</label>
          <input class="filter-input" v-model="userFilter.name" />
        </div>
        <div>
          <label>Email</label>
          <input class="filter-input" v-model="userFilter.email" />
        </div>
        <div>
          <label>ID</label>
          <input class="filter-input-id" v-model="userFilter.id" />
        </div>
      </div>
      <div class="add-buttonWrapper">
        <button v-if="!showAddUserSection" class="add-button" @click="() => (showAddUserSection = !showAddUserSection)">
          Add User
        </button>
      </div>
    </div>
    <br />
    <hr class="devider" />
    <div v-if="showAddUserSection" class="addUserContainer">
      <div>
        <div>
          <label>FirstName</label>
          <input class="filter-input" v-model="newUser.firstName" />
        </div>
        <div>
          <label>LastName</label>
          <input class="filter-input" v-model="newUser.lastName" />
        </div>
        <div>
          <label>Email</label>
          <input class="filter-input" v-model="newUser.email" />
        </div>
      </div>
      <div>
        <button class="add-button" @click="addNewUser">Add</button>
      </div>
    </div>
    <hr v-if="showAddUserSection" class="devider" />
    <div class="loading">
      <span v-if="!searchResults">Loading ...</span>
    </div>
    <HomeList v-if="searchResults" :users="searchResults" :removeUser="removeUser" />
  </div>
</template>

<style>
.headingWrapper {
  width: 800px;
  margin-bottom: 20px;
}

.filter-input {
  border-radius: 10px;
  padding: 6px 10px;
  border: 2px solid rgb(213, 213, 213);
}

.filter-input:focus {
  outline-color: transparent;
  outline-style: none;
}
.filter-input-id {
  border-radius: 10px;
  padding: 6px 10px;
  border: 2px solid rgb(213, 213, 213);
  max-width: 60px;
}

.filter-input-id:focus {
  outline-color: transparent;
  outline-style: none;
}

label {
  margin-right: 10px;
}
.add-button {
  border-radius: 10px;
  padding: 5px 10px;
  border: 2px solid #00ff75;
  background-color: white;
  margin-left: 20px;
  cursor: pointer;
}

.add-buttonWrapper {
  min-width: 120px;
  /* min-height: 50px; */
}

.devider {
  width: 900px;
}

.container {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.addUserContainer {
  margin: 24px 0;
  width: 100%;
  max-width: 800px;
}

.addUserContainer > div:first-of-type {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.addUserContainer > div:last-of-type {
  display: flex;
  justify-content: flex-end;
}

.filters {
  width: 100%;
  max-width: 800px;
  display: flex;
  justify-content: space-between;
}

.filters > div > div {
  display: flex;
  margin-right: 20px;
  flex-wrap: nowrap;
  align-items: center;
}

.filters > div {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}
</style>
