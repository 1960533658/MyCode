<template>
  <AppLayout>
    <template v-slot:default> HomePage</template>
  </AppLayout>
</template>

<script>
import AppLayout from "./AppLayout";

export default {
  name: "HomePage",
  components: { AppLayout },
};
</script>

<style scoped></style>
