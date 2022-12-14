<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import ShiftsList from '../components/ShiftsList.vue';
import { deleteUser, type UserAPI, getUser, updateUser } from '@/api/users.api';
import { getShiftsById, type ShiftAPI } from '@/api/shifts.api';
import { useRoute, useRouter } from 'vue-router';

export interface ShiftPair {
  checkIn: string;
  checkOut: string;
  totalTime: string;
  id: string;
  status: number;
}

function DateFormat(date: Date): string {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function calculateTotalTime(start: Date, end: Date | null): string {
  const difference = end !== null ? end.getTime() - start.getTime() : new Date().getTime() - start.getTime();

  // tired of match two lines below, just copied it, it works
  const hours = Math.floor((difference % 86400000) / 3600000);
  const minutes = Math.ceil(((difference % 86400000) % 3600000) / 60000);

  return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
}

export default defineComponent({
  name: 'Home',
  components: {
    ShiftsList,
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
      nfcCardId: user.value?.nfcCardId || '',
    });
    const shifts = ref<ShiftAPI[] | undefined>();

    onMounted(async () => {
      user.value = await getUser(userId);
      updatedUser.value = {
        firstName: user.value?.firstName || '',
        lastName: user.value?.lastName || '',
        email: user.value?.email || '',
        nfcCardId: user.value?.nfcCardId || '',
      };
      shifts.value = await getShiftsById(userId);
    });

    const showUpdateUserSection = ref(false);

    const removeUser = async () => {
      const deletedUser = await deleteUser(userId);
      if (!deletedUser) {
        return;
      }
      router.push({ name: 'home' });
    };

    const errorMessage = ref('');
    const updateUserHandler = async () => {
      if (!user.value) {
        return;
      }

      if (!updatedUser.value.firstName || !updatedUser.value.lastName || !updatedUser.value.email) {
        errorMessage.value = 'Please fill out all fields';
        return;
      }
      if (updatedUser.value.email.length > 50) {
        errorMessage.value = "Email length can't be over 50 characters long";
      }
      if (updatedUser.value.email.length < 20) {
        errorMessage.value = "Email length can't be over 50 characters long";
      }
      const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!emailRegex.test(updatedUser.value.email)) {
        errorMessage.value = 'Please enter a valid email';
        return;
      }

      if (updatedUser.value.firstName.length < 3 || updatedUser.value.firstName.length > 30) {
        errorMessage.value = 'First name must be between 3 and 30 characters long';
        return;
      }
      if (updatedUser.value.lastName.length < 3 || updatedUser.value.lastName.length > 30) {
        errorMessage.value = 'Last name must be between 3 and 30 characters long';
        return;
      }

      const firstName = updatedUser.value.firstName;
      const lastName = updatedUser.value.lastName;
      const firstNameHasNumbers = /\d/.test(firstName);
      const firstNameHasPunctuation = /[^a-zA-Z\d\s:]/.test(firstName);
      const lastNameHasNumbers = /\d/.test(lastName);
      const lastNameHasPunctuation = /[^a-zA-Z\d\s:]/.test(lastName);
      if (firstNameHasPunctuation) {
        errorMessage.value = 'First name cannot punctuation';
        return;
      }
      if (lastNameHasPunctuation) {
        errorMessage.value = 'Last name cannot punctuation';
        return;
      }
      if (firstNameHasNumbers) {
        errorMessage.value = 'First name cannot contain numbers';
        return;
      }
      if (lastNameHasNumbers) {
        errorMessage.value = 'Last name cannot contain numbers';
        return;
      }

      errorMessage.value = '';

      const newUser = await updateUser(userId, { ...updatedUser.value });
      if (!newUser) {
        return;
      }
      user.value = newUser;
      showUpdateUserSection.value = false;
    };

    const shiftsPairs = computed(() => {
      if (!shifts.value) {
        return [];
      }
      const pairedShifts = shifts.value
        .reduce(
          (accumulator, value, index) => {
            if (index % 2 === 0) {
              return [...accumulator, [value]];
            }
            if (index % 2 === 1) {
              const [theLast, ...rest] = accumulator.reverse();
              return [...rest, [...theLast, value]];
            }
            return accumulator;
          },
          [[{}, {}]]
        )
        .filter(pair => pair.length && Object.keys(pair[0]).length)
        .sort((a: any, b: any) => {
          return new Date(b[0].createdAt).getTime() - new Date(a[0].createdAt).getTime();
        });

      return pairedShifts
        .map(pair => {
          const checkInDate = new Date(Object(pair[0]).createdAt as Date);
          if (pair.length < 2) {
            return {
              checkIn: DateFormat(checkInDate),
              checkOut: '-',
              totalTime: calculateTotalTime(checkInDate, null),
              id: user.value!.nfcCardId,
              status: 1,
            };
          }
          const checkOutDate = new Date(Object(pair[1]).createdAt as Date);
          return {
            checkIn: DateFormat(checkInDate),
            checkOut: DateFormat(checkOutDate),
            totalTime: calculateTotalTime(checkInDate, checkOutDate),
            id: user.value!.nfcCardId,
            status: 0,
          };
        })
        .filter(pair => pair);
    });
    const test = () => console.log(shiftsPairs.value);

    return {
      user,
      removeUser,
      showUpdateUserSection,
      updatedUser,
      updateUserHandler,
      shifts,
      test,
      shiftsPairs,
      errorMessage,
    };
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

      <div>
        <label>NfcCardId:</label>
        <span>{{ user.nfcCardId }}</span>
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
        <div>
          <label>NfcCardId</label>
          <input class="filter-input" v-model="updatedUser.nfcCardId" />
        </div>
      </div>
      <label style="color: red">{{ errorMessage }}</label>
      <div>
        <button class="add-button" @click="updateUserHandler">Update User</button>
        <button class="remove-button" @click="removeUser">Remove User</button>
      </div>
    </div>
    <hr v-if="showUpdateUserSection" class="devider" />
    <div class="loading">
      <span v-if="!shiftsPairs">Loading ...</span>
    </div>
    <ShiftsList v-if="shifts" :shifts="shiftsPairs" />
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

.remove-button {
  border-radius: 10px;
  padding: 5px 10px;
  border: 2px solid #ff7300;
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

.addUserContainer > div:first-of-type > div:not(:last-child) {
  margin-right: 16px;
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
