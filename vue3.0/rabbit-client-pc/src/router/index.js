import { createRouter, createWebHashHistory } from "vue-router";

//  进行懒加载
const HomePage = () => import("../views/Home/HomePage");
const TopCategoryPage = () => import("../views/Category/TopCategoryPage");
const SubCateGoryPage = () => import("../views/Category/SubCateGoryPage");

const routes = [
  // 首页
  { path: "/", component: HomePage },
  // 一级分类页面
  { path: "/category/:id", component: TopCategoryPage },
  // 二级分类页面
  { path: "/category/sub/:id", component: SubCateGoryPage },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
