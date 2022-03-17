<script setup>
import { getCurrentInstance, useSlots } from 'vue';

// 父传子传递参数
defineProps({
  msg: String,
});
// 触发传递的自定义事件
defineEmits(["delete"])
// 定义要暴露导出的数据
const count = 0;
defineExpose({count})

// 显示插槽数据
const instance = getCurrentInstance();
const slots = useSlots()
instance.render = () => <div>{slots.default()}</div>
</script>
<template>
  <div>
    <div>{{ msg }}</div>
    <button @click="$emit('delete')">button</button>
  </div>
</template>