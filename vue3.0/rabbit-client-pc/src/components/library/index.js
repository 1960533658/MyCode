import lazy from "../directives/lazy";
// 获取模块路径集合 模块导入函数
const importFn = require.context("./", false, /\.vue$/);
const keys = importFn.keys();
const library = {
  install(app) {
    // 骨架屏组件 挂载
    // app.component(XtxSkeleton.name, XtxSkeleton);
    // // 轮播图组件 挂载
    // app.component(XtxCarousel.name, XtxCarousel);
    // // 查看更多组件 挂载
    // app.component(XtxMore.name, XtxMore);
    // // 小兔鲜面包屑组件
    // app.component(XtxBrand.name, XtxBrand);
    // app.component(XtxBrandItem.name, XtxBrandItem);
    // 图片懒加载指令 挂载
    app.directive("lazy", lazy);
    keys.forEach((item) => {
      const component = importFn(item).default;
      console.log(component.name);
      app.component(component.name, component);
    });
  },
};

export default library;
