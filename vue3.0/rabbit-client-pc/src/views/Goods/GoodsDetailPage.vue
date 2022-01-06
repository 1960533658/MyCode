<template>
  <AppLayout>
    <div class="xtx-goods-page">
      <div class="container">
        <!-- 面包屑 -->
        <XtxBrand>
          <XtxBrandItem path="/">首页</XtxBrandItem>
          <XtxBrandItem :path="`/category/${goodsDetailList?.categories[1].id}`"
            >{{ goodsDetailList?.categories[1].name }}
          </XtxBrandItem>
          <XtxBrandItem :path="`/category/${goodsDetailList?.categories[0].id}`"
            >{{ goodsDetailList?.categories[0].name }}
          </XtxBrandItem>
          <XtxBrandItem path="/">{{ goodsDetailList?.name }}</XtxBrandItem>
        </XtxBrand>
        <!-- 商品信息 -->
        <div class="goods-info">
          <!-- 左侧 -->
          <div class="media">
            <!-- 传递图片税局 -->
            <GoodsImages :imagesList="goodsDetailList?.mainPictures" />
            <!-- 商品 评价信息 -->
            <GoodsSales />
          </div>
          <!-- 右侧 -->
          <div class="spec">
            <!-- 商品 详细信息 -->
            <GoodsInfo :goodsDetailList="goodsDetailList" />
            <!-- 商品规格组件 -->
            <GoodsSku
              v-if="goodsDetailList"
              :skus="goodsDetailList.skus"
              :specs="goodsDetailList.specs"
              @onSpecChange="onSpecChange"
            />
            <!-- 商品数量组件 -->
            <XtxNumberBox
              v-model="goodsCount"
              :max="goodsDetailList?.inventory"
              label="数量"
            />
            <!-- 按钮组件 -->
            <XtxButton :style="{ 'margin-top': '20px' }" type="primary"
              >加入购物车
            </XtxButton>
          </div>
        </div>
        <!-- 商品推荐 -->
        <GoodsRelevant
          v-if="goodsDetailList"
          :goodsId="goodsDetailList.id"
        ></GoodsRelevant>
        <!-- 商品详情 -->
        <div class="goods-footer">
          <div class="goods-article">
            <!-- 商品+评价 -->
            <GoodsTab v-if="goodsDetailList" />
            <!-- 注意事项 -->
            <GoodsWarn />
          </div>
          <!-- 24热榜 -->
          <div class="goods-aside">
            <GoodsHot :type="1" />
            <GoodsHot :type="2" />
            <GoodsHot :type="3" />
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script>
import GoodsRelevant from "./components/GoodsRelevant";
import AppLayout from "../../components/AppLayout";
import { provide, ref } from "vue";
import { getGoodsDetailById } from "../../api/goods";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import GoodsImages from "./components/GoodsImages";
import GoodsSales from "./components/GoodsSales";
import GoodsInfo from "./components/GoodsInfo";
import GoodsSku from "./components/GoodsSku";
import GoodsTab from "./components/GoodsTab";
import GoodsHot from "./components/GoodsHot";
import GoodsWarn from "./components/GoodsWarn";

export default {
  name: "GoodsDetailPage",
  components: {
    GoodsWarn,
    GoodsHot,
    GoodsTab,
    GoodsSku,
    GoodsInfo,
    GoodsSales,
    GoodsImages,
    GoodsRelevant,
    AppLayout,
  },
  setup() {
    //#region  获取详细商品数据
    const { goodsDetailList, getData } = useGoodsDetail();
    //#endregion

    //#region  当用户选择完整的规格之后 更新视图
    function onSpecChange(data) {
      console.log(data);
      goodsDetailList.value.price = data.price;
      goodsDetailList.value.oldPrice = data.oldPrice;
      goodsDetailList.value.inventory = data.inventory;
    }

    //#endregion

    //#region  商品数量组件
    // 设置默认数据
    const goodsCount = ref(1);
    console.log(goodsDetailList);
    //#endregion

    //#region  开放商品数据给子组件使用
    provide("goodsDetailList", goodsDetailList);
    //#endregion
    return {
      goodsDetailList,
      getData,
      onSpecChange,
      goodsCount,
    };
  },
};

//#region  用于获取商品详细信息的方法
function useGoodsDetail() {
  // 存储商品详细信息
  const goodsDetailList = ref();
  // 通过Api获取商品详细数据
  const getData = (id) => {
    // 向服务器发送请求获取数据
    getGoodsDetailById(id).then((data) => {
      goodsDetailList.value = data.result;
    });
  };
  // 获取route对象回去路径参数（id）
  const route = useRoute();
  getData(route.params.id);
  // 当路由发生变化的时候更新数据
  onBeforeRouteUpdate((to) => {
    getData(to.params.id);
  });

  return {
    goodsDetailList,
    getData,
  };
}

//#endregion
</script>

<style lang="less" scoped>
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;

  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }

  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}

.goods-footer {
  display: flex;
  margin-top: 20px;

  .goods-article {
    width: 940px;
    margin-right: 20px;
  }

  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}

.goods-tabs {
  min-height: 600px;
  background: #fff;
}

.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
