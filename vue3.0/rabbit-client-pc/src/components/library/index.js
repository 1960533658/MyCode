import XtxSkeleton from "./XtxSkeleton";
import XtxCarousel from "./XtxCarousel";
import XtxMore from "./XtxMore";

const library = {
  install(app) {
    // 骨架屏组件 挂载
    app.component(XtxSkeleton.name, XtxSkeleton);
    // 轮播图组件 挂载
    app.component(XtxCarousel.name, XtxCarousel);
    // 查看更多组件 挂载
    app.component(XtxMore.name, XtxMore);
  },
};

export default library;
