<script lang="ts">
import type { ShiftPair } from '@/views/User.vue';
import { defineComponent, type PropType } from 'vue';

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
    <td class="pill">
      <div class="pillActive" v-if="shift.status === 1">at work</div>
      <div class="pillClosed" v-else>closed</div>
    </td>
  </tr>
</template>

<style scoped>
.tableItem {
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

.pill {
  width: 150px;
}

.pillActive {
  background-color: #ffc165;
  text-align: center;
  width: 80px;
  border-radius: 20px;
}

.pillClosed {
  background-color: #b5ff84;
  text-align: center;
  width: 80px;
  border-radius: 20px;
}

.pillActive {
}
</style>
