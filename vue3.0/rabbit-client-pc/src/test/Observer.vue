<template>
  <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  <div ref="target" class="box">你好康康</div>
</template>

<script>
import { useIntersectionObserver } from "@vueuse/core";
import { ref } from "vue";

export default {
  name: "Observer",
  setup() {
    const target = ref();
    /**
     * @target 第一个参数： 要监听的元素
     * @callback [{isIntersection}]
     * @isIntersection 元素是否进入可是去
     * @stop() 让监视元素进入可视区的函数 终止监视（数据请求已发送） 只让函数执行一次
     */
    const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        console.log("元素进入了可视区");
        stop();
      }
    });
    return {
      target,
    };
  },
};
</script>

<style scoped>
.box {
  width: 500px;
  height: 500px;
  background-color: skyblue;
}
</style>
