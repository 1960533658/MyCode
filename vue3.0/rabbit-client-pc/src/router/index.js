import { createRouter, createWebHashHistory } from "vue-router";

//  进行懒加载
const HomePage = () => import("../views/Home/HomePage");
const TopCategoryPage = () => import("../views/Category/TopCategoryPage");
const SubCateGoryPage = () => import("../views/Category/SubCateGoryPage");
const GoodsDetailPage = () => import("../views/Goods/GoodsDetailPage");

const routes = [
  // 首页
  { path: "/", component: HomePage },
  // 一级分类页面
  { path: "/category/:id", component: TopCategoryPage },
  // 二级分类页面
  { path: "/category/sub/:id", component: SubCateGoryPage },
  // 商品详情页面
  { path: "/goods/:id", component: GoodsDetailPage },
];

const router = createRouter({
  history: createWebHashHistory(),
  // 路由刷新让页面自动滚动到首页
  scrollBehavior() {
    return { top: 0 };
  },
  routes,
});

export default router;
