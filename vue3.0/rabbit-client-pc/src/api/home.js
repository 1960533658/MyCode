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

//#region  获取品牌推荐数据
/**
 * 获取品牌推荐数据
 * @param limit 限制请求数据的数量
 * @returns {Promise}
 */
export function getBrandsApi(limit = 6) {
  return requestWithOutToken("/home/brand", "get", { limit });
}

//#endregion

//#region  首页 轮播图数据
/**
 * 获取首页轮播图数据
 * @param distributionSite 默认值为1 获取首页轮播图数据 2为分类商品也
 * @returns {Promise}
 */
export function getBannersApi(distributionSite = 1) {
  return requestWithOutToken("/home/banner", "get", { distributionSite });
}

//#endregion

//#region  首页 新鲜好物数据
/**
 * 获取新鲜好物数据
 * @param limit
 * @returns {Promise}
 */
export function getNewGoodsApi(limit = 4) {
  return requestWithOutToken("/home/new", "get", { limit });
}

//#endregion

//#region 首页——人气推荐数据
/**
 * 获取人气推荐数据
 * @returns {Promise}
 */
export function getHomeHotApi() {
  return requestWithOutToken("/home/hot", "get");
}

//#endregion

//#region  首页--最新专题数据
/**
 * 获取最新专题数据
 * @returns {Promise}
 */
export function getHomeSpecialApi() {
  return requestWithOutToken("/home/special", "get");
}

//#endregion

//#region  首页——产品区块
/**
 * 获取产品区块数据
 * @returns {Promise}
 */
export function getHomeGoodsApi() {
  return requestWithOutToken("/home/goods", "get");
}

//#endregion
