import { requestWithOutToken } from "../utils/request";

//#region  获取商品详细信息Api
/**
 * 获取商品详细信息Api
 * @param id 商品Id
 * @returns {Promise}
 */
export function getGoodsDetailById(id) {
  return requestWithOutToken("/goods", "get", { id });
}

//#endregion

//#region  获取商品评价头部信息
/**
 * 获取商品评价头部信息
 * @param id 商品Id
 * @returns {Promise}
 */
export function getCommentInfoApi(id) {
  return requestWithOutToken(
    `https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`,
    "get"
  );
}

//#endregion

//#region  获取商品评价列表数据
/**
 * 获取商品评价列表数据
 * @param id 商品id
 * @param params 参数对象：分页信息 商品id tag hasPicture
 * @returns {Promise}
 */
export function getCommentListApi(params) {
  return requestWithOutToken(
    `https://mock.boxuegu.com/mock/1175/goods/${params.id}/evaluate/page`,
    "get",
    params
  );
}

//#endregion
