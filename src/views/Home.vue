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

    const selectedFilter = ref<string | null>(null);
    const searchQuery = ref('');

    const filterCriteria = [
      { id: 1, key: 'id', label: 'ID' },
      { id: 2, key: 'email', label: 'Email' },
      { id: 3, key: 'firstName', label: 'First Name' },
      { id: 4, key: 'lastName', label: 'Last Name' }
    ];

    const filterData = (data: UserAPI[], selectedFilter: string | null, searchQuery: string): UserAPI[] => {
      if (!selectedFilter) {
        return data;
      }

      return data.filter(item => {
        if (selectedFilter !== null) {
          const filterValue = (item as any)[selectedFilter];
          return filterValue.toString().toLowerCase().includes(searchQuery.toLowerCase());
        }

        return false;
      });
    };

    const searchResults = computed(() => {
      return filterData(mock, selectedFilter.value, searchQuery.value);
    });

    return { users, searchResults, selectedFilter, searchQuery, filterCriteria, filterData };
  },
});
</script>


<template>
  <div>
    <h1>Home</h1>

    <label>Filter by:
      <select v-model="selectedFilter">
        <option value="null" selected>---</option>
        <option v-for="criteria in filterCriteria" :value="criteria.key">
          {{ criteria.label }}
        </option>
      </select>
    </label>

    <label>Search:
      <input v-model="searchQuery" />
    </label>

    <HomeList :users="searchResults" />
  </div>
</template>

