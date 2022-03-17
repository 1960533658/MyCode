<script setup>
import axios from 'axios';
import { storeToRefs } from "pinia";
import { useUser } from "../store/user";
const user = useUser();
// 创建响应式的user数据
const { username, age, sex, count } = storeToRefs(user);
// 第一种更新方法——通过action
const updataUsernameState = () => {
  user.updataUsername("张三", 20);
  console.log(111);
};
// 第二种更新方法——通过$patch直接修改state
const updataUsernameToPatch = () => {
  user.$patch({ username: "李四", age: 24, sex: "女" });
};
// 重置state
const onReset = () => {
  user.$reset()
}
// 替换状态
const onPlace = () => {
  user.$state = {username: "王五"}
}
// count加1
const onPlusOne = () => {
  user.$state = {count: count.value +1 }
}
const onGetTopics =() => {
  user.getTopics();
}
</script>
<template>
  <div>
    姓名:
    <strong
      ><i>{{ username }}</i></strong
    >
    年龄:
    <strong
      ><i>{{ age }}</i></strong
    >
    <br />
    姓名:<em>{{ user.username }}</em>
    <br />
    姓名:
    <strong
      ><i>{{ username }}</i></strong
    >
    年龄:
    <strong
      ><i>{{ age }}</i></strong
    >
    性别:
    <strong
      ><i>{{ sex }}</i></strong
    >
    <h3>更新pinia状态</h3>
    <button @click="updataUsernameState">更新state</button>
    <br />
    <button @click="updataUsernameToPatch">通过user.$patch更新state</button>
    <br />
    <button @click="onReset">重置state</button>
    <br />
    <button @click="onPlace">替换state</button>
    <h3>getters计算属性</h3>
    <button>count:{{ count }}</button>
    <p>
      双倍count：<strong>{{ user.doubleCount }}</strong>
    </p>
    <button @click="onPlusOne">count+1</button>
    <p>
      双倍count+any（getters传参）：<strong>{{ user.doubleCountPlusAny(3) }}</strong>
    </p>
    <p>pinia异步获取后端数据</p>

    <button @click="onGetTopics">pinia异步获取后端数据</button>
    <li v-for="item in user.topicsData" :key="item.id">{{item.title}}</li>
  </div>
</template>