// 导入默认图片
import defaultImg from "../../assets/images/200.png";

// 创建指令
const lazy = {
  // 指令在元素挂载的时候执行
  mounted(el, binding) {
    const observer = new IntersectionObserver(([{ isIntersecting }]) => {
      // 当进入可视区
      if (isIntersecting) {
        // 停止监听元素
        observer.unobserve(el);
        // 给元素添加src路径参数
        el.src = binding.value;
        // 图片加载出错
        el.onerror = function () {
          el.src = defaultImg;
        };
      }
    });
    observer.observe(el);
  },
};

export default lazy;
