import { requestWithOutToken } from "../utils/request";

//#region  根据id获取二级分类数据
/**
 * 获取一级分类id具体数据
 * @param id 一级分类id
 * @returns {Promise}
 */
export function getTopCategoryById(id) {
  return requestWithOutToken("/category", "get", { id });
}

//#endregion

//#region  获取二级分类页面筛选条件
/**
 *获取二级分类id筛选条件
 * @param id 二级分类id
 * @returns {Promise}
 */
export function getSubCategoryFilterById(id) {
  return requestWithOutToken("/category/sub/filter", "get", { id });
}

//#endregion

//#region  获取二级分类页面——商品列表
/**
 * 获取二级分类商品列表
 * @param reqParams 二级分类Id、请求条件、筛选条件、分页信息 的集合对象
 * @returns {Promise}
 */
export function getSubCategoryGoodsListById(reqParams) {
  return requestWithOutToken("/category/goods", "post", {
    reqParams,
  });
}

//#endregion
