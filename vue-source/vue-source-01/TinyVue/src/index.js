import { initMixin } from "./init";
// TinyVue 构造函数
function TinyVue(options) {
  // 进行初始化
  this._init(options);
}
// 混入初始化代码（将初始化的函数一起写在init文件中）
initMixin(TinyVue)
export default TinyVue; 
