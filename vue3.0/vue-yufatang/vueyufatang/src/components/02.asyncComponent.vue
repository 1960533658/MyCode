<script setup>
import axios from "axios"
// 异步获取数据
let {data: {data: response}} = await axios.get("https://cnodejs.org/api/v1/topics")
// 数据过多减少数据到十条
response.length = 10;
</script>
<template>
  <div>
    <h1>异步组件的外部不需要使用async</h1>
    <ul>
      <!-- 遍历数据渲染模板 -->
      <li v-for="item in response" :key="item.id">{{item.title}}</li>
    </ul>
  </div>
</template>