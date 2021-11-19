<template>
  <AppLayout>
    <template v-slot:default>
      <div class="container">
        <HomeCategory />
      </div>
    </template>
  </AppLayout>
</template>

<script>
import AppLayout from "../../components/AppLayout";
import HomeCategory from "./components/HomeCategory";

export default {
  name: "HomePage",
  components: { HomeCategory, AppLayout },
};
</script>

<style scoped></style>
