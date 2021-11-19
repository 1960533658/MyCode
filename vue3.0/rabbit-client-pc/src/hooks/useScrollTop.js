// 给window绑定scroll事件 让控制悬浮导航显示与隐藏
import { onMounted, onUnmounted, ref } from "vue";

export default function useScrollTop() {
  //存储滚动距离 用于模板中作为元素的显示与隐藏的一句
  const scroll = ref(0);
  // 滚动事件处理函数
  const onScrollHandler = () => {
    // 存储滚动距离
    scroll.value = document.documentElement.scrollTop;
  };
  // 组件挂载完成之后 挂载scroll事件
  onMounted(() => {
    window.addEventListener("scroll", onScrollHandler);
  });
  // 组件卸载完成之后 取消挂载scroll事件
  onUnmounted(() => {
    window.removeEventListener("scroll", onScrollHandler);
  });
  return scroll;
}
