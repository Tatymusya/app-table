<template>
  <TheHeader>
    <div class="banner">Таблица с сортировкой и фильтрацией данных</div>
  </TheHeader>

  <TheMain>
    <ViewHome />
  </TheMain>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheHeader from "@/layouts/TheHeader/TheHeader";
import TheMain from "@/layouts/TheMain/TheMain";
import ViewHome from "@/views/ViewHome.vue";

export default defineComponent({
  name: "App",
  components: {
    TheHeader,
    TheMain,
    ViewHome,
  },
});
</script>

<style>
@import "~@/assets/css/app";
.banner {
  text-align: center;
  font-size: var(--small-font-size);
  color: var(--base-light-color);
}
</style>
