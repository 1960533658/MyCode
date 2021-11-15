<template>
  {{ $store.state.user.profile }}
  <button @click="handle">按钮</button>
</template>
<script>
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const handle = () => {
      store.commit("user/setUser", { token: "test" });
    };
    return {
      handle,
    };
  },
};
</script>

<style lang="less"></style>
