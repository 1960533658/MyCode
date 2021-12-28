import axios from "axios";
import store from "../store";
import router from "../router";
// 线上开发接口 https://apipc-xiaotuxian-front.itheima.net/
// 开发接口 http://pcapi-xiaotuxian-front-devtest.itheima.net/
export const baseURL = "https://apipc-xiaotuxian-front.itheima.net/";

// 创建请求实例对象（不包含token）
const instanceWithOutToken = axios.create({ baseURL });
// 创建请求实例对象 （包含请求对象）
const instanceWithToken = axios.create({ baseURL });

//#region  配置请求拦截器 携带token
instanceWithToken.interceptors.request.use((config) => {
  //判断token是否存在
  const token = store.state.user.profile.token;
  if (token) {
    // 判断token是否存在 如果存在将token存放在请求头中
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
//#endregion

//#region  通过请求拦截器 精简数据层级
instanceWithToken.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // 检查 token是否国企
    if (error.response.status === 401) {
      // 清空本地token
      store.commit("user/setUser", {});
      //  跳转到登录页面
      router
        .push("/login")
        .then(() => {
          console.log("跳转成功");
        })
        .catch(() => {
          console.log("跳转失败");
        });
    }
    return Promise.reject(error);
  }
);
//#endregion

//#region  请求拦截器（不带带Token） 竞价数据层级
instanceWithOutToken.interceptors.response.use((response) => response.data);
//#endregion

//#region  用于发送请求的函数
/**
 * 封装Ajax方法
 * @param url 请求地址
 * @param method 请求方法
 * @param data 请求数据
 * @returns {{[p: string]: *, method, url}}
 */
function generateRequestConfig(url, method, data) {
  return {
    url,
    method,
    [method === "get" ? "params" : "data"]: data,
  };
}

//#endregion

//#region  用于发送携带token的请求
export function requestWithToken(url, method, data) {
  instanceWithToken(generateRequestConfig(url, method, data));
}

//#endregion

//#region  发送普通请求 无token
export function requestWithOutToken(url, method, data) {
  return instanceWithOutToken(generateRequestConfig(url, method, data));
}

//#endregion
