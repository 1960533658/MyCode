import { initState } from "./initState";

export function initMixin(TinyVue) {
  // 给TinyVue构造函数 prototype （原型） 添加 _init数据初始化方法
  TinyVue.prototype._init = function (options) {
    // 将开发者传递的配置选项挂载到VM实例中，方便其他扩展方法获取开发者选项
    this.$options = options;
    // 数据初始化
    initState(this)
    // 进入挂载阶段
    if (options.el) {
      console.log("进入到挂载阶段")
    }
  };
}