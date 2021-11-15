<template>
  <div class="finaltest">
    <h1>{{ firstName }}</h1>
    <h1>{{ lastName }}</h1>
    <button @click="handleClick">我是FinalTest组件的button</button>
  </div>
</template>

<script>
export default {
  props: ["firstName", "lastName"],
  setup(props, { emit }) {
    const handleClick = () => {
      emit("update:firstName", "康某人");
      emit("update:lastName", "SPRING_LONG");
    };
    return {
      handleClick,
    };
  },
};
</script>
