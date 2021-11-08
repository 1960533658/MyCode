<template>
  <div class="son">
    {{ forSon }}
    <h1>儿子组件</h1>
    {{ forChild }}
  </div>
</template>

<script>
import { computed } from "vue";
export default {
  props: ["forSon"],
  setup(props) {
    console.log(props);
    // 当父组件更新 props 时 setup 函数是不会重新执行的
    // 所以在 setup 函数中使用 props 时需要用到 computed 或者 watch 来响应 props 的变化
    // 注意: 直接在模板中使用 props 数据是没有这个问题的
    const forChild = computed(() => props.forSon);
    return {
      forChild,
    };
  },
};
</script>