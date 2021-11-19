import { getCategoriesApi } from "../api/home";
import { topCategoryDefaultList } from "../api/constance";

const category = {
  // 使用命名空间模块
  namespaced: true,
  state() {
    return {
      list: topCategoryDefaultList.map((name) => ({ name })),
    };
  },
  mutations: {
    // 更改分类数据
    setCategoriesList(state, payload) {
      state.list = payload;
    },
    //#region  修改 open 的布尔值
    open(state, id) {
      let target = state.list.find((item) => item.id === id);
      target.open = true;
    },
    close(state, id) {
      let index = state.list.findIndex((item) => item.id === id);
      state.list[index].open = false;
    },
    //#endregion
  },
  actions: {
    // 获取分类数据
    getCategories({ commit }) {
      getCategoriesApi().then((data) => {
        // 给数据添加open属性 用以控制二级菜单的显示与隐藏
        data.result.forEach((item) => (item.open = false));
        commit("setCategoriesList", data.result);
      });
    },
  },
};

export default category;
