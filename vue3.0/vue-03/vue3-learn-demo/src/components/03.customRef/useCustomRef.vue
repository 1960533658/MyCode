<template>
  <div class="customRef">
    <h1>防抖操作——只响应用户连续操作的最后一次</h1>
    <button @click="handle">按钮</button>
  </div>
</template>

<script>
export default {
  setup() {
    const handle = debounce(() => {
      console.log("点击了");
    }, 400);
    return {
      handle,
    };
  },
};

/**
 * 用于防抖的函数
 * @param handler 事件处理函数体
 * @param delay 防抖频率市场
 */
function debounce(handler, delay) {
  let timer = null;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      handler.call(this, arguments);
    }, delay);
  };
}
</script>
