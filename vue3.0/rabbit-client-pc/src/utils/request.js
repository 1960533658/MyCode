import axios from "axios";
import store from "../store";
import router from "../router";

export const baseURL = "http://pcapi-xiaotuxian-front-devtest.itheima.net/";

// 创建请求实例对象（不包含token）
const instanceWithOutToken = axios.create({ baseURL });
// 创建请求实例对象 （包含请求对象）
const instanceWithToken = axios.create({ baseURL });

// 配置请求拦截器 携带token
instanceWithToken.interceptors.request.use((config) => {
  //判断token是否存在
  const token = store.state.user.profile.token;
  if (token) {
    // 判断token是否存在 如果存在将token存放在请求头中
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//  通过请求拦截器 精简数据层级
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
