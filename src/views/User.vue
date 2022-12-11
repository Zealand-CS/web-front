<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import UserList from '../components/UserList.vue';
import { deleteUser, type UserAPI, getUser, updateUser } from '@/api/users.api';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: 'Home',
  components: {
    UserList,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { id } = route.params;
    const userId = Number(id);

    const user = ref<UserAPI | undefined>();
    const updatedUser = ref({
      firstName: user.value?.firstName || '',
      lastName: user.value?.lastName || '',
      email: user.value?.email || '',
    });

    onMounted(async () => {
      user.value = await getUser(userId);
      updatedUser.value = {
        firstName: user.value?.firstName || '',
        lastName: user.value?.lastName || '',
        email: user.value?.email || '',
      };
    });

    const showUpdateUserSection = ref(false);

    const removeUser = async () => {
      const deletedUser = await deleteUser(userId);
      if (!deletedUser) {
        return;
      }
      router.push({ name: 'home' });
    };

    const updateUserHnadler = async () => {
      const newUser = await updateUser(userId, updatedUser.value);
      if (!newUser) {
        return;
      }
      user.value = newUser;
      showUpdateUserSection.value = false;
    };

    return { user, removeUser, showUpdateUserSection, updatedUser, updateUserHnadler };
  },
});
</script>

<template>
  <div class="loading">
    <span v-if="!user">Loading ...</span>
  </div>
  <div v-if="user" class="container">
    <div class="headingWrapper">
      <h2>User</h2>
    </div>
    <div class="filters">
      <div>
        <label>Name:</label>
        <span>{{ `${user.firstName} ${user.lastName}` }}</span>
      </div>
      <div>
        <label>Email:</label>
        <span>{{ user.email }}</span>
      </div>
      <div>
        <label>ID:</label>
        <span>{{ user.id }}</span>
      </div>

      <div class="add-buttonWrapper">
        <button
          v-if="!showUpdateUserSection"
          class="add-button"
          @click="() => (showUpdateUserSection = !showUpdateUserSection)"
        >
          Update User
        </button>
      </div>
    </div>
    <br />
    <hr class="devider" />
    <div v-if="showUpdateUserSection" class="addUserContainer">
      <div>
        <div>
          <label>FirstName</label>
          <input class="filter-input" v-model="updatedUser.firstName" />
        </div>
        <div>
          <label>LastName</label>
          <input class="filter-input" v-model="updatedUser.lastName" />
        </div>
        <div>
          <label>Email</label>
          <input class="filter-input" v-model="updatedUser.email" />
        </div>
      </div>
      <div>
        <button class="add-button" @click="updateUserHnadler">Update User</button>
        <button class="add-button" @click="removeUser">Remove User</button>
      </div>
    </div>
    <hr v-if="showUpdateUserSection" class="devider" />
    <!-- <HomeList v-if="searchResults" :users="result" :removeUser="removeUser" /> -->
  </div>
</template>

<style scoped>
.headingWrapper {
  width: 800px;
  margin-bottom: 20px;
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
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;
}

.filters {
  width: 100%;
  max-width: 800px;
  display: flex;
  justify-content: space-between;
}

.filters > div {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}

.filters > div > span {
  font-weight: 500;
}
</style>
