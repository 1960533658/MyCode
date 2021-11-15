<template>
  <div class="inputBinding">
    <h1>表单双向数据绑定</h1>
    <!--
          @update:modelValue自定义事件 当数据更新时键最新的指返回，@update:moduleValue是固定格式不变的
          传递参数时，将$event放在最后面 参数房前前面
          由此属性实现数据双向数据绑定的监听 同样的也可以使用 onUpdated watch computed 方法进行数据的监听
     -->
    <input
      type="text"
      v-model="username"
      @update:modelValue="onUsernameChange('a', $event)"
    />
    <!-- 点击按钮让username变化 --->
    <button @click="handle">点击按钮让username变化</button>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const username = ref("张三");
    const handle = () => {
      username.value = "kangkang";
    };
    const onUsernameChange = (arg, date) => {
      console.log("onUsernameChange");
      console.log(arg);
      console.log(date);
    };

    return {
      username,
      handle,
      onUsernameChange,
    };
  },
};
</script>
