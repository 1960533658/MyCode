<template>
  <div class="account-box">
    <div class="toggle">
      <button @click="handleIsMsg(false)">
        <i class="iconfont icon-user"></i> 使用账号登录
      </button>
      <button @click="handleIsMsg(true)">
        <i class="iconfont icon-msg"></i> 使用短信登录
      </button>
    </div>
    <div class="form">
      <!-- 账户登录 -->
      <template v-if="!isMsgLogin">
        <form>
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-user"></i>
              <input placeholder="请输入用户名" type="text" />
            </div>
            <div class="error">
              <i class="iconfont icon-warning"></i>
            </div>
          </div>
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-lock"></i>
              <input placeholder="请输入密码" type="password" />
            </div>
            <div class="error">
              <i class="iconfont icon-warning"></i>
            </div>
          </div>
          <div class="form-item">
            <div class="agree">
              <XtxCheckbox />
              <span>我已同意</span>
              <a href="javascript:">《隐私条款》</a>
              <span>和</span>
              <a href="javascript:">《服务条款》</a>
            </div>
            <div class="error">
              <i class="iconfont icon-warning"></i>
            </div>
          </div>
          <button class="btn" type="submit">登录</button>
        </form>
      </template>
      <!-- 短信登录 -->
      <template v-if="isMsgLogin">
        <form>
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-user"></i>
              <input placeholder="请输入手机号" type="text" />
            </div>
            <div class="error">
              <i class="iconfont icon-warning"></i>
            </div>
          </div>
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-code"></i>
              <input placeholder="请输入验证码" type="password" />
              <span class="code">发送验证码</span>
            </div>
            <div class="error">
              <i class="iconfont icon-warning"></i>
            </div>
          </div>
          <div class="form-item">
            <div class="agree">
              <XtxCheckbox />
              <span>我已同意</span>
              <a href="javascript:">《隐私条款》</a>
              <span>和</span>
              <a href="javascript:">《服务条款》</a>
            </div>
            <div class="error">
              <i class="iconfont icon-warning"></i>
            </div>
          </div>
          <button class="btn" type="submit">登录</button>
        </form>
      </template>
    </div>
    <div class="action">
      <img
        alt=""
        src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
      />
      <div class="url">
        <a href="javascript:">忘记密码</a>
        <a href="javascript:">免费注册</a>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";

export default {
  name: "LoginForm",
  setup() {
    const isMsgLogin = ref(false);
    const handleIsMsg = (boo) => {
      isMsgLogin.value = boo;
      console.log(boo);
    };
    return {
      isMsgLogin,
      handleIsMsg,
    };
  },
};
</script>
<style lang="less" scoped>
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;

    button {
      color: @xtxColor;
      background: none;
      border: none;
      cursor: pointer;

      i {
        font-size: 14px;
      }
    }
  }

  .form {
    padding: 0 40px;

    &-item {
      margin-bottom: 28px;

      .input {
        position: relative;
        height: 36px;

        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }

        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;

          &.error {
            border-color: @priceColor;
          }

          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }

        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }

        .code.disabled {
          cursor: wait;
        }
      }

      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;

        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }

    .agree {
      a {
        color: #069;
      }
    }

    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      border: none;

      &.disabled {
        background: #cfcdcd;
      }
    }
  }

  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
