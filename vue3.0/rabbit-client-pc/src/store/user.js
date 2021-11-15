const user = {
  // 使用命名空间模块
  namespaced: true,
  state() {
    return {
      // 用户信息
      profile: {
        //id
        id: "",
        // 用户头像
        avatar: "",
        //用户昵称
        nickname: "",
        // 用户账号
        account: "",
        // 手机号
        mobile: "",
        // 用户登录凭证
        token: "",
      },
    };
  },
  mutations: {
    setUser(state, payload) {
      console.log(payload);
      // 当payload为空 清空用户信息 当payload不为空 设置用户信息
      if (Object.keys(payload)) {
        state.profile = {
          ...state.profile,
          ...payload,
        };
      } else {
        // 清空对象
        state.profile = {};
      }
    },
  },
};

export default user;
