<template>
  <AppHeading>Таблица</AppHeading>
  <UserDataTable :users="usersData" />
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import AppHeading from "@/common/components/AppHeading/AppHeading";
import UserDataTable from "@/modules/UserDataTable.vue";
import { IUser } from "@/types";
import Users from "@/static/Front_ForTable.json";

export default defineComponent({
  name: "ViewHome",
  components: {
    AppHeading,
    UserDataTable,
  },
  setup() {
    const usersData: IUser[] = reactive(Users);
    return {
      usersData,
    };
  },
});
</script>
