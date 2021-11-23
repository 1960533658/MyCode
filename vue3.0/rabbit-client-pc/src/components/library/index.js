import XtxSkeleton from "./XtxSkeleton";
import XtxCarousel from "./XtxCarousel";
import XtxMore from "./XtxMore";
import lazy from "../directives/lazy";

const library = {
  install(app) {
    // 骨架屏组件 挂载
    app.component(XtxSkeleton.name, XtxSkeleton);
    // 轮播图组件 挂载
    app.component(XtxCarousel.name, XtxCarousel);
    // 查看更多组件 挂载
    app.component(XtxMore.name, XtxMore);
    // 图片懒加载指令 挂载
    app.directive("lazy", lazy);
  },
};

export default library;
