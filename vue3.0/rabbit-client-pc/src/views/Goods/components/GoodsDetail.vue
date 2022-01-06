<template>
  <div class="goods-detail">
    <!-- 属性 -->
    <ul class="attrs">
      <li v-for="item in goodsDetailList.details.properties" :key="item.name">
        <span class="dt">{{ item.name }}</span>
        <span class="dd">{{ item.value }}</span>
      </li>
    </ul>
    <!-- 图片 -->
    <img
      v-for="item in goodsDetailList.details.pictures"
      :key="item"
      v-lazy="item"
      alt=""
      src=""
    />
  </div>
</template>
<script>
import { inject } from "vue";

export default {
  name: "GoodsDetail",
  setup() {
    const goodsDetailList = inject("goodsDetailList");
    return {
      goodsDetailList,
    };
  },
};
</script>
<style lang="less" scoped>
.goods-detail {
  padding: 40px;

  .attrs {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;

    li {
      display: flex;
      margin-bottom: 10px;
      width: 50%;

      .dt {
        width: 100px;
        color: #999;
      }

      .dd {
        flex: 1;
        color: #666;
      }
    }
  }

  > img {
    width: 100%;
  }
}
</style>
