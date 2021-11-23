<template>
  <HomePanel ref="target" sub-title="人气爆款 不容错过" title="人气推荐">
    <ul v-if="homeHotList" class="goods-list">
      <li v-for="item in homeHotList" :key="item.id">
        <RouterLink to="/">
          <img :alt="item.title" :src="item.picture" />
          <p class="name">{{ item.title }}</p>
          <p class="desc">{{ item.alt }}</p>
        </RouterLink>
      </li>
    </ul>
    <Transition>
      <HomeSkeleton v-if="!homeHotList" />
    </Transition>
  </HomePanel>
</template>

<script>
import HomePanel from "./HomePanel";
import { getHomeHotApi } from "../../../api/home";
import useLazyData from "../../../hooks/useLazyData";
import HomeSkeleton from "./HomeSkeleton";

export default {
  name: "HomeHot",
  components: { HomeSkeleton, HomePanel },

  setup() {
    const { target, result: homeHotList } = useLazyData(getHomeHotApi);
    return { homeHotList, target };
  },
};
</script>
<style lang="less" scoped>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;

  li {
    width: 306px;
    height: 406px;
    .hoverShadow();

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }

    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
