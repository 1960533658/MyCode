<template>
  <div class="testtemplate">
    <h1>{{ modelValue }}</h1>
    <button @click="handleClick">我是TestTemplate组件的button</button>
  </div>
</template>

<script>
export default {
  props: ["modelValue"],
  setup(props, { emit }) {
    const handleClick = () => {
      emit("update:modelValue", "康某人");
    };
    return {
      handleClick,
    };
  },
};
</script>
