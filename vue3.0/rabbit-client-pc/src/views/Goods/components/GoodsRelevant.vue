<template>
  <div class="goods-relevant">
    <div class="header">
      <i class="icon"></i>
      <span class="title">{{ goodsId ? "同类商品推荐" : "猜你喜欢" }}</span>
    </div>
    <!-- 此处使用改造后的xtx-carousel.vue -->
    <XtxCarousel :bannerList="relevantList" />
  </div>
</template>

<script>
import { ref } from "vue";
import { getRelevantApi } from "../../../api/goods";
import { useRoute } from "vue-router";
// import _ from  "lodash"

export default {
  props: {
    goodsId: {
      type: String,
      default: "",
    },
  },
  name: "GoodsRelevant",
  setup() {
    // 获取同类商品数据和用于同类商品数据的方法
    const { relevantList, getDate } = getRelevantDate();
    // 获取路由对象
    const route = useRoute();
    // 发送请求获取数据
    getDate(route.params.id, 7);
    return {
      relevantList,
    };
  },
};

// 获取商品数据的方法
function getRelevantDate() {
  // 创建变量保存数据
  const relevantList = ref();
  // 存储轮播图数据
  const carousels = ref([]);
  // 获取商品数据
  const getDate = (id, limit) => {
    getRelevantApi({ id, limit }).then((data) => {
      // 每页显示的个数
      const size = 4;
      // 总页数
      const total = Math.ceil(data.result.length / size);
      // 开始循环 循环次数为总页数
      // console.log(_.chunk(data.result, 4))
      // carousels.value = _.chunk(data.result, 4)
      for (let i = 0; i < total; i++) {
        // 构建二维数组
        carousels.value.push(data.result.slice(i * size, i * size + size));
      }
      relevantList.value = carousels.value;
    });
  };
  return { relevantList, getDate };
}
</script>

<style lang="less" scoped>
.goods-relevant {
  background: #fff;
  min-height: 460px;
  margin-top: 20px;

  .header {
    height: 80px;
    line-height: 80px;
    padding: 0 20px;

    .title {
      font-size: 20px;
      padding-left: 10px;
    }

    .icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      border-top: 4px solid @xtxColor;
      border-right: 4px solid @xtxColor;
      box-sizing: border-box;
      position: relative;
      transform: rotate(45deg);

      &::before {
        content: "";
        width: 10px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 2px;
        background: lighten(@xtxColor, 40%);
      }
    }
  }

  :deep(.xtx-carousel) {
    height: 380px;

    .carousel {
      &-indicator {
        bottom: 30px;

        span {
          &.active {
            background: @xtxColor;
          }
        }
      }

      &-btn {
        top: 110px;
        opacity: 1;
        background: rgba(0, 0, 0, 0);
        color: #ddd;

        i {
          font-size: 30px;
        }
      }
    }
  }
}
</style>
