import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 在main.js中引入 第三方样式重置库 和 common.js自己的样式重置以及公共样式
import "normalize.css";
import "@/assets/styles/common.less";

import library from "./components/library";

createApp(App).use(store).use(router).use(library).mount("#app");
