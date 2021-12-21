//#region  获取商品详细信息Api
import { requestWithOutToken } from "../utils/request";

/**
 * 获取商品详细信息Api
 * @param id 商品Id
 * @returns {Promise}
 */
export function getGoodsDetailById(id) {
  return requestWithOutToken("/goods", "get", { id });
}

//#endregion
