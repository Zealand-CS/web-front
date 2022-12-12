<script lang="ts">
import type { ShiftAPI } from '@/api/shifts.api';
import type { UserAPI } from '@/api/users.api';
import type { ShiftPair } from '@/views/User.vue';
import { computed, defineComponent, type PropType } from 'vue';
import { useRouter } from 'vue-router';

// defineProps<HomeListItemProps>();
export default defineComponent({
  props: {
    shift: {
      required: true,
      type: Object as PropType<ShiftPair>,
    },
  },
});
</script>

<template>
  <tr class="tableItem">
    <td>{{ shift.checkIn }}</td>
    <td>{{ shift.checkOut }}</td>
    <td>{{ shift.totalTime }}</td>
    <td>{{ shift.id }}</td>
    <td>{{ shift.status }}</td>
  </tr>
</template>

<style scoped>
.tableItem {
  /* line-height: 40px; */
  /* height: 50px; */
  position: relative;
  border-radius: 10px;
  box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.25);
}

.tableItem > td {
  padding: 16px 20px;
  font-weight: 500;
}

.deleteButton {
  position: absolute;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  background-color: aqua;
  z-index: 99;
  right: 30px;
  top: 20px;
}
</style>
