<template>
  <input type="text" v-model="keyword" />
  {{ keyword }}
</template>
<script>
import { customRef } from "vue";
export default {
  name: "App",
  setup() {
    const keyword = useDebounceRef("Hello", 400);
    return { keyword };
  },
};

function useDebounceRef(initialValue, delay) {
  let timer = null;
  return customRef((track, trigger) => {
    return {
      get() {
        // 跟踪 initialValue 值的变量
        track();
        return initialValue;
      },
      set(newValue) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          initialValue = newValue;
          // 触发视图更新
          trigger();
        }, delay);
      },
    };
  });
}
</script>
