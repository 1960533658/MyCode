<script setup>
// 此处代码将会被编译为 setup 函数代码
// 也就是说此处代码将会在组件每次创建实例时执行
// 在内部声明的顶级变量和函数都可以在模板中你直接使用
import { capitalize } from "./utils";
const test = "这里是vue3 语法塘";
const onClick = () => {
  console.log(test);
};
const str = "hello vue";
const onClickStr = () => {
  console.log(capitalize(str));
};
</script>
<template>
  <div>
    <div @click="onClick">{{ test }}</div>
    <div @click="onClickStr">{{ str }}</div>
  </div>
</template>
