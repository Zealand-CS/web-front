<script setup lang="ts">
import type { ShiftAPI } from '@/api/shifts.api';
import type { ShiftPair } from '@/views/User.vue';
import ShiftsListItem from './ShiftsListItem.vue';

interface ShiftsListProps {
  shifts: ShiftPair[];
}
defineProps<ShiftsListProps>();
</script>

<template>
  <div class="tableContainer">
    <table>
      <tr>
        <th>CheckIn</th>
        <th>CheckOut</th>
        <th>Time in Total</th>
        <th>Id</th>
        <th>Status</th>
      </tr>
      <template v-for="shift in shifts">
        <ShiftsListItem :shift="shift" />
      </template>
    </table>
  </div>
</template>

<style scoped>
.tableContainer {
  width: 100%;
  display: flex;
  justify-content: center;
}

.tableContainer > table {
  width: 800px;
  border-collapse: separate;
  border-spacing: 20px;
  text-align: left;
  /* table-layout: auto; */
}

.tableContainer > table > tr {
}

.tableContainer > table th {
  padding-left: 20px;
}
</style>
