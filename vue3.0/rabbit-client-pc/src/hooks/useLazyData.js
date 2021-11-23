// 数据懒加载（当需要数据的页面到可视化窗口的时候再进行数据的获取）
import { ref } from "vue";
import { useIntersectionObserver } from "@vueuse/core";

export default function useLazyData(apiFunction) {
  const target = ref(null);
  // 存储数据对象
  const result = ref(null);
  // 监听数据
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }]) => {
      if (isIntersecting) {
        stop();
        apiFunction().then((data) => (result.value = data.result));
      }
    },
    // 元素进入可视区就执行回调函数
    { threshold: 0 }
  );
  return {
    target,
    result,
  };
}
