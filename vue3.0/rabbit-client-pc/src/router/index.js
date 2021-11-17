import { createRouter, createWebHashHistory } from "vue-router";
import HomePage from "../views/Home/HomePage";

const routes = [{ path: "/", component: HomePage }];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
