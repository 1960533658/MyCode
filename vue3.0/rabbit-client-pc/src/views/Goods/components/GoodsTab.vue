<template>
  <div class="goods-tabs">
    <nav>
      <a
        :class="{ active: activeComponentName === 'GoodsDetail' }"
        href="javascript:"
        @click="onTabChange('GoodsDetail')"
        >商品详情</a
      >
      <a
        :class="{ active: activeComponentName === 'GoodsComment' }"
        href="javascript:"
        @click="onTabChange('GoodsComment')"
        >商品评价<span>(500+)</span></a
      >
    </nav>
    <!-- 切换内容的地方 -->
    <component :is="activeComponentName" />
  </div>
</template>
<script>
import { ref } from "vue";
import GoodsDetail from "./GoodsDetail";
import GoodsComment from "./GoodsComment";

export default {
  name: "GoodsTab",
  components: {
    GoodsDetail,
    GoodsComment,
  },
  setup() {
    const activeComponentName = ref("GoodsDetail");
    const onTabChange = (tabName) => {
      activeComponentName.value = tabName;
    };
    return {
      activeComponentName,
      onTabChange,
    };
  },
};
</script>
<style lang="less" scoped>
.goods-tabs {
  min-height: 600px;
  background: #fff;

  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;

    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;

      > span {
        color: @priceColor;
        font-size: 16px;
        margin-left: 10px;
      }

      &:first-child {
        border-right: 1px solid #f5f5f5;
      }

      &.active {
        &::before {
          content: "";
          position: absolute;
          left: 40px;
          bottom: -1px;
          width: 72px;
          height: 2px;
          background: @xtxColor;
        }
      }
    }
  }
}
</style>
