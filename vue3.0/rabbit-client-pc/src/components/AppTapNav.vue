<template>
  <nav class="app-top-nav">
    <div class="container">
      <ul>
        <!-- 用户信息存在时的显示 -->
        <template v-if="user.profile.token">
          <li>
            <a href="javascript:"
              ><i class="iconfont icon-user"></i>{{ user.profile.account }}</a
            >
          </li>
          <li><a href="javascript:">退出登录</a></li>
        </template>
        <!-- 用户信息不存在时的显示 -->
        <template v-else>
          <li>
            <router-link to="/login">请先登录</router-link>
          </li>
          <li><a href="javascript:">免费注册</a></li>
        </template>
        <li><a href="javascript:">我的订单</a></li>
        <li><a href="javascript:">会员中心</a></li>
        <li><a href="javascript:">帮助中心</a></li>
        <li><a href="javascript:">关于我们</a></li>
        <li>
          <a href="javascript:"><i class="iconfont icon-phone"></i>手机版</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { useStore } from "vuex";

export default {
  name: "AppTapNav",
  setup() {
    const store = useStore();
    const user = store.state.user;
    // 调价用户token进行测试
    const handle = () => {
      store.commit("user/setUser", { token: "test" });
    };
    return {
      user,
      handle,
    };
  },
};
</script>

<style lang="less" scoped>
.app-top-nav {
  background: #333;

  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;

    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: @xtxColor;
        }
      }

      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
