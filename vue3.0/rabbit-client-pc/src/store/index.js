import { createStore } from "vuex";
//#region  引入需要初九话存储数据的文件
import user from "./user";
import category from "./category";
import cart from "./cart";
//#endregion
// 引入 vuex-persistedstate
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  modules: {
    user,
    cart,
    category,
  },
  plugins: [
    createPersistedState({
      // 指定将哪些模块中的数据同步到本地
      paths: ["user", "cart"],
      // 指定数据存储在 localStorage 中的名字
      key: "rabbit-client-pc",
    }),
  ],
});

export default store;
