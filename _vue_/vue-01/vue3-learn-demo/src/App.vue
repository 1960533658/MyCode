<template>
  <div>
    <h1 @click="handleClick">Vue test{{ name }}</h1>
    <!-- ref -->
    <!-- <Ref></Ref> -->

    <!-- reactive -->
    <!-- <Reactive></Reactive> -->

    <!-- 计算属性 -->
    <!-- <Computed></Computed> -->

    <!-- 监听属性——watch -->
    <!-- <Watch></Watch> -->

    <!-- 监听属性——watchEffect -->
    <!-- <watchEffect></watchEffect> -->

    <!-- toRef函数 -->
    <!-- <useToRef></useToRef> -->

    <!-- toREfs函数批量转化 -->
    <!-- <useToRefs></useToRefs> -->

    <!-- 组件通讯 -->
    <Father></Father>
  </div>
</template>

<script>
// ref
import Ref from "./components/Ref.vue";
// reactive
import Reactive from "./components/Reactive.vue";
// 计算属性
import Computed from "./components/Computed.vue";
// 监听属性 watch
import Watch from "./components/Watch.vue";
// 监听属性——watchEffect
import WatchEffect from "./components/WatchEffect.vue";
// toRef函数
import UseToRef from "./components/useToRef.vue";
// toREfs函数批量转化
import UseToRefs from './components/useToRefs.vue'
// 组件通讯
import Father from './components/communication/Father.vue'

export default {
  components: { Ref, Reactive, Computed, Watch, WatchEffect, UseToRef, UseToRefs, Father },
  // setup() {
  //   console.log(this); // undefined
  //   let name = "张三";
  //   const handleClick = () => {
  //     name = "李四"
  //     console.log(name) // 李四
  //   }
  //   return {
  //     name,
  //     handleClick
  //   }
  // },
  // beforeCreate() {
  //   console.log("beforeCreate") // beforeCreate
  //   console.log(this.name)
  // },
};
</script>
