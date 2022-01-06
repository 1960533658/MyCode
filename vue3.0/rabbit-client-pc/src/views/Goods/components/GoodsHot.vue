<template>
  <div v-if="goodsHotList" class="goods-hot">
    <h3>{{ titles[type] }}</h3>
    <goods-item v-for="item in goodsHotList" :key="item.id" :goods="item" />
  </div>
</template>
<script>
import GoodsItem from "../../Category/components/GoodsItem";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { getGoodsHotApi } from "../../../api/goods";

export default {
  name: "GoodsHot",
  components: { GoodsItem },
  props: {
    type: {
      type: Number,
      default: 1,
    },
  },
  setup(props) {
    const { getDate, goodsHotList } = useGoodsHot();
    const titles = ref({
      1: "24小时热榜",
      2: "周榜",
      3: "总榜",
    });
    getDate(props.type);
    return {
      goodsHotList,
      titles,
    };
  },
};
// 获取24小时热销榜单数据
const useGoodsHot = () => {
  // 存储热销榜单数据
  const goodsHotList = ref();
  // 获取路由对象信息
  const route = useRoute();
  // 获取热销榜单数据
  const getDate = (type) => {
    // 向服务器发送请求获取热销榜单对象数据
    getGoodsHotApi(route.params.id, 3, type).then(
      // 存储热销榜单数据
      (data) => (goodsHotList.value = data.result)
    );
  };
  return { getDate, goodsHotList };
};
</script>
<style lang="less" scoped>
.goods-hot {
  h3 {
    height: 70px;
    background: @helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }

  :deep(.goods-item) {
    background: #fff;
    width: 100%;
    margin-bottom: 10px;

    img {
      width: 200px;
      height: 200px;
    }

    p {
      margin: 0 10px;
    }

    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}
</style>
