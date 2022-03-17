<script setup>
// import HelloWorld from "./components/01.HelloWorld.vue";
// import AsyncComponent from "./components/02.asyncComponent.vue"
import UsePinia from "./components/03.UsePinia.vue"
import { capitalize } from "./utils";
import { ref } from "vue";
const test = "这里是vue3 语法塘";
// 点击控制台打印
const onClick = () => {
  console.log(test);
};
const str = "hello vue";
// 点击控制台打印字符串为大写
const onClickStr = () => {
  console.log(capitalize(str));
};

// 子组件触发父组件的自定义事件
const deleteHandler = () => {
  alert(2333);
};

// 获取子组件中的数据
const instance = ref(null);
const onClickHandler = () => {
  console.log(instance.value);
}
</script>

<template>
  <div>
    <!-- <div @click="onClick">{{ test }}</div> -->
    <!-- <div @click="onClickStr">{{ str }}</div> -->
    <!-- <HelloWorld msg="hello" @delete="deleteHandler" ref="instance"> -->
      <!-- <h1>插槽数据</h1> -->
    <!-- </HelloWorld> -->
    <!-- <button @click="onClickHandler">暴露子组件（helloworld）中的数据给app</button> -->
    <!-- 由于是异步组件，模板会比数据更早渲染 使用Suspense组件可以回复script提前于模板执行 -->
    <!-- <Suspense> -->
      <!-- <AsyncComponent /> -->
    <!-- </Suspense> -->
    <h1>使用pinia</h1>
      <UsePinia></UsePinia>
    
  </div>
</template>