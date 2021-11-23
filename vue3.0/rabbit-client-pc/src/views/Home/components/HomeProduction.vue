<template>
  <div ref="target" class="home-product">
    <HomePanel v-for="item in homeGoodsList" :key="item.id" :title="item.name">
      <template v-slot:right>
        <div class="sub">
          <RouterLink
            v-for="sub in item.children"
            :key="sub.id"
            :to="`/category/sub/${sub.id}`"
            >{{ sub.subname }}
          </RouterLink>
        </div>
        <XtxMore :path="`/category/${item.id}`" />
      </template>
      <template v-slot:default>
        <div class="box">
          <RouterLink class="cover" to="/">
            <img v-lazy="item.picture" alt="" />
            <strong class="label">
              <span>{{ item.name }}馆</span>
              <span>{{ item.saleInfo }}</span>
            </strong>
          </RouterLink>
          <ul v-if="item.goods" class="goods-list">
            <li v-for="goods in item.goods" :key="goods.id">
              <HomeGoods :goods="goods" />
            </li>
          </ul>
        </div>
      </template>
    </HomePanel>
  </div>
</template>

<script>
import HomeGoods from "./HomeGoods";
import HomePanel from "./HomePanel";
import XtxMore from "../../../components/library/XtxMore";
import useLazyData from "../../../hooks/useLazyData";
import { getHomeGoodsApi } from "../../../api/home";

export default {
  name: "HomeProduct",
  components: { XtxMore, HomePanel, HomeGoods },
  setup() {
    const { target, result: homeGoodsList } = useLazyData(getHomeGoodsApi);
    return { target, homeGoodsList };
  },
};
</script>

<style lang="less" scoped>
.home-product {
  background: #fff;
  height: 2900px;

  .sub {
    margin-bottom: 2px;

    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;

      &:hover {
        background: @xtxColor;
        color: #fff;
      }

      &:last-child {
        margin-right: 80px;
      }
    }
  }

  .box {
    display: flex;

    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .label {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);

        span {
          text-align: center;

          &:first-child {
            width: 76px;
            background: rgba(0, 0, 0, 0.9);
          }

          &:last-child {
            flex: 1;
            background: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }

    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;

      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;

        &:nth-last-child(-n + 4) {
          margin-bottom: 0;
        }

        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
