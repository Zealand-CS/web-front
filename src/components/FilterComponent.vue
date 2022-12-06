<script lang="ts">

  const filterCriteria: { id: number; key: string; label: string }[] = [
    { id: 1, key: 'id', label: 'ID' },
    { id: 2, key: 'email', label: 'Email' },
    { id: 3, key: 'firstName', label: 'First Name' },
    { id: 4, key: 'lastName', label: 'Last Name' }
  ];
  
  interface FilterProperties {
    filterCriteria: { id: number; key: string; label: string }[];
    selectedFilter: string | null;
    searchQuery: string;
    filteredData: any[]; 
  }
  export default {
    props: {
      data: {
        type: Array,
        required: true,
      }
    },
    data(): FilterProperties {
      return {
        filterCriteria,
        selectedFilter: null,
        searchQuery: '',
        filteredData: this.data as FilterProperties[],
      };
    },
    methods: {
      filterData(): any[] {
        if (!this.selectedFilter) {
          return this.data;
        }
        return this.data.filter(item => {
          if (this.selectedFilter !== null) {
            const filterValue = (item as any)[this.selectedFilter];
            return filterValue.toString().toLowerCase().includes(this.searchQuery.toLowerCase());
          }
          return false;
        });
      }
    }
  }
</script>

<template>
  <div>
    <div class="filter-container">
      <select v-model="selectedFilter">
        <option value="null">No Filter</option>
        <option v-for="criteria in filterCriteria" :value="criteria.key">{{ criteria.label }}</option>
      </select>
      <input v-model="searchQuery" placeholder="Enter search query" />
    </div>
    <br>
    <hr style="margin: 0 300px;" />
    <br>
    <table class="table-container">
      <thead>
        <tr>
          <th v-for="property in filterCriteria">{{ property.label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filterData()">
          <td v-for="property in filterCriteria">{{ item[property.key] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  </template>


<style>

  .filter-container {
    text-align: center;
  }

  .table-container {
    margin: 0 auto;
    width: 50%;
  }

  table {
    border-collapse: collapse;
  }

  th, td {
    padding: 32px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  tr:hover {
    background-color: #f5f5f5;
  }

  select {
    margin-top: 8px;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  option {
    padding: 8px;
  }
  input {
    margin-left: 8px; 
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
</style>



