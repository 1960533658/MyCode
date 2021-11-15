import { createStore } from "vuex";
import moduleA from "@/store/ModuleA";
import moduleB from "@/store/moduleB";
import nameSpaceA from "@/store/nameSpaceA";
import nameSpaceB from "@/store/nameSpaceB";

export default createStore({
  // 状态属性
  state: {
    name: "康康",
    aaa: 12321,
  },
  //  修改状态属性
  mutations: {
    updateNames(state, payload) {
      state.name = payload;
    },
  },
  // 异步操作
  actions: {
    updateName(ctx) {
      setTimeout(() => {
        ctx.commit("updateNames", "康某");
      }, 2000);
    },
  },
  // 计算属性
  getters: {
    newNames(state) {
      return state.name + "kangkang";
    },
  },
  //Vuex 模块化
  modules: {
    moduleA: moduleA,
    moduleB: moduleB,
    nameSpaceA: nameSpaceA,
    nameSpaceB: nameSpaceB,
  },
});
