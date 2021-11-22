<template>
  <HomePanel subTitle="新鲜出炉 品质靠谱" title="新鲜好物">
    <template v-slot:right>
      <XtxMore />
    </template>
    <template v-slot:default>
      <ul class="goods-list">
        <li v-for="item in newGoodsList" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="" />
            <p class="name ellipsis">{{ item.name }}</p>
            <p class="price">&yen;{{ item.price }}</p>
          </RouterLink>
        </li>
      </ul>
    </template>
  </HomePanel>
</template>
<script>
import HomePanel from "./HomePanel";
import { ref } from "vue";
import { getNewGoodsApi } from "../../../api/home";

export default {
  name: "HomeNewGoods",
  components: { HomePanel },
  setup() {
    const { newGoodsList, getData } = useHomeNew();
    getData();
    return { newGoodsList };
  },
};

// 获取新鲜好物数据
function useHomeNew() {
  const newGoodsList = ref(null);
  const getData = () => {
    getNewGoodsApi().then((data) => {
      newGoodsList.value = data.result;
    });
  };
  return { newGoodsList, getData };
}
</script>
<style lang="less" scoped>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }

    .price {
      color: @priceColor;
    }
  }
}
</style>
