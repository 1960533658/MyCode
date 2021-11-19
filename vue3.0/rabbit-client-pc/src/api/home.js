// 首页的Api接口

//#region  分类列表结构数据
import { requestWithOutToken } from "../utils/request";

/**
 * 用于获取分类列表数据
 * @returns {Promise}
 */
export function getCategoriesApi() {
  return requestWithOutToken("/home/category/head", "get");
}

//#endregion
