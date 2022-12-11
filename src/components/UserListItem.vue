<script lang="ts">
import type { UserAPI } from '@/api/users.api';
import { computed, defineComponent, type PropType } from 'vue';
import { useRouter } from 'vue-router';

interface HomeListItemProps {
  user: UserAPI;
}

// defineProps<HomeListItemProps>();
export default defineComponent({
  props: {
    user: {
      required: true,
      type: Object as PropType<UserAPI>,
    },
  },
  setup(props) {
    const route = useRouter();
    const redirectToUser = () => route.push({ name: 'user', params: { id: props.user.id } });
    return { redirectToUser };
  },
});
</script>

<template>
  <tr class="tableItem" @click="redirectToUser">
    <td>time</td>
    <td>time</td>
    <td>time</td>
    <td>id</td>
    <td>status</td>
  </tr>
</template>

<style scoped>
.tableItem {
  /* line-height: 40px; */
  /* height: 50px; */
  position: relative;
  border-radius: 10px;
  box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.25);
  cursor: pointer;
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
