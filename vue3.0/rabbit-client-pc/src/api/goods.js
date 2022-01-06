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

//#region  获取同类商品或猜你喜欢数据
/**
 * 获取同类商品或猜你喜欢数据
 * @param id 商品Id
 * @param limit 获取数据的个数
 * @returns {Promise}
 */
export function getRelevantApi({ id, limit = 16 }) {
  return requestWithOutToken("/goods/relevant", "get", { id, limit });
}

//#endregion

//#region  获取热榜商品数据
/**
 * 获取24小时热销商品数据
 * @param id 商品id
 * @param limit 获取数量
 * @param type 热销商品类型 1为24小时，2为周榜，3为总榜，默认为1
 * @returns {Promise}
 */
export function getGoodsHotApi(id, limit, type = 1) {
  return requestWithOutToken("/goods/hot", "get", { id, limit, type });
}

//#endregion
