<template>
  <LoginHeader>欢迎登录</LoginHeader>
  <section class="login-section">
    <div class="wrapper">
      <nav>
        <a
          :class="activeName === 'account'"
          href="javascript:"
          @click="handlerSelectLogin('account')"
          >账户登录</a
        >
        <a
          :class="activeName === 'qrcode'"
          href="javascript:"
          @click="handlerSelectLogin('qrcode')"
          >扫码登录</a
        >
      </nav>
      <!-- 即将放置账号登录表单组件, 此处使用div先占个位 -->
      <LoginForm
        v-show="activeName === 'account'"
        class="account-box"
      ></LoginForm>
      <!-- 二维码登录 -->
      <div v-show="activeName === 'qrcode'" class="qrcode-box">
        <img alt="" src="../../assets/images/qrcode.jpg" />
        <p>打开 <a href="javascript:">小兔鲜App</a> 扫码登录</p>
      </div>
    </div>
  </section>
  <LoginFooter />
</template>
<script>
import LoginHeader from "./components/LoginHeader";
import LoginFooter from "./components/LoginFooter";
import { ref } from "vue";
import LoginForm from "./components/LoginForm";

export default {
  name: "LoginPage",
  components: { LoginForm, LoginFooter, LoginHeader },
  setup() {
    const activeName = ref("account");
    const handlerSelectLogin = (className) => {
      activeName.value = className;
    };
    return {
      activeName,
      handlerSelectLogin,
    };
  },
};
</script>
<style lang="less" scoped>
.login-section {
  background: url(../../assets/images/login-bg.png) no-repeat center / cover;
  height: 488px;
  position: relative;

  .wrapper {
    width: 380px;
    background: #fff;
    min-height: 400px;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

    .qrcode-box {
      text-align: center;
      padding-top: 40px;

      p {
        margin-top: 20px;

        a {
          color: @xtxColor;
          font-size: 16px;
        }
      }
    }

    nav {
      height: 55px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;

      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;

        &:first-child {
          border-right: 1px solid #f5f5f5;
          text-align: left;
        }

        &.active {
          color: @xtxColor;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
