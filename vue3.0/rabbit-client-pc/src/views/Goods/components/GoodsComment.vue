<template>
  <div class="goods-comment">
    <div v-if="commentInfo" class="head">
      <div class="data">
        <p>
          <span>{{ commentInfo.salesCount }}</span
          ><span>人购买</span>
        </p>
        <p>
          <span>{{ commentInfo.praisePercent }}</span
          ><span>好评率</span>
        </p>
      </div>
      <div class="tags">
        <div class="dt">大家都在说：</div>
        <div class="dd">
          <a
            v-for="item in commentInfo.tags"
            :key="item.title"
            :class="{ active: activeTagName === item.title }"
            href="javascript:"
            @click="
              onSelectedChange(item.title);
              updateReqParams({ tag: item.title });
            "
            >{{ item.title }}（{{ item.tagCount }}）</a
          >
        </div>
      </div>
    </div>
    <div class="sort">
      <span>排序：</span>
      <a
        :class="{ active: reqParams.sortField === '' }"
        href="javascript:"
        @click="updateReqParams({ sortField: '' })"
        >默认</a
      >
      <a
        :class="{ active: reqParams.sortField === 'createTime' }"
        href="javascript:"
        @click="updateReqParams({ sortField: 'createTime' })"
        >最新</a
      >
      <a
        :class="{ active: reqParams.sortField === 'praiseCount' }"
        href="javascript:"
        @click="updateReqParams({ sortField: 'praiseCount' })"
        >最热</a
      >
    </div>
    <div v-if="commentList" class="list">
      <div v-for="item in commentList.items" :key="item.id" class="item">
        <div class="user">
          <img :src="item.member.avatar" alt="" />
          <span>{{ formatNickname(item.member.nickname) }}</span>
        </div>
        <div class="body">
          <div class="score">
            <i
              v-for="score in item.score"
              :key="'s' + score"
              class="iconfont icon-wjx01"
            ></i>
            <i
              v-for="score in 5 - item.score"
              :key="'k' + score"
              class="iconfont icon-wjx02"
            ></i>
            <span class="attr">{{ formatAttr(item.orderInfo.specs) }}</span>
          </div>
          <div class="text">
            {{ item.content }}
          </div>
          <GoodsCommentImage
            v-if="item.pictures.length"
            :pictures="item.pictures"
          />
          <div class="time">
            <span>{{ item.createTime }}</span>
            <span class="zan"
              ><i class="iconfont icon-dianzan"></i>{{ item.praiseCount }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <!-- 小兔鲜分页组件        @update:page="updateReqParams({ page: $event })" -->
    <XtxPagination v-model:page="reqParams.page" :counts="counts" />
  </div>
</template>
<script>
import { ref, watch } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { getCommentInfoApi, getCommentListApi } from "../../../api/goods";
import GoodsCommentImage from "./GoodsCommentImage";

export default {
  name: "GoodsComment",
  components: { GoodsCommentImage },
  setup() {
    // 获取评价头部信息
    const { commentInfo, activeTagName, counts } = useCommentInfo();
    const onSelectedChange = (title) => {
      activeTagName.value = title;
    };
    //  获取商品评价列表数据
    const {
      commentList,
      formatNickname,
      formatAttr,
      updateReqParams,
      reqParams,
    } = useCommentList();
    return {
      commentInfo,
      activeTagName,
      onSelectedChange,
      commentList,
      formatNickname,
      formatAttr,
      updateReqParams,
      reqParams,
      counts,
    };
  },
};

//#region  获取商品头部信息
function useCommentInfo() {
  // 存储商品头部信息
  const commentInfo = ref();
  // 获取路由对象
  const route = useRoute();
  // 实现标签的全部选中效果
  const activeTagName = ref("全部评价");
  // 获取头部信息数据的方法
  const counts = ref(0);
  const getDate = (id) => {
    getCommentInfoApi(id).then((data) => {
      data.result.tags.unshift({
        title: "有图",
        tagCount: data.result.evaluateCount,
      });
      data.result.tags.unshift({
        title: "全部评价",
        tagCount: data.result.evaluateCount,
      });
      // 存储评价头部信息
      commentInfo.value = data.result;
      counts.value = data.result.counts;
    });
  };
  // 发送请求
  getDate(route.params.id);
  // 商品切换时重新获取数据
  onBeforeRouteUpdate((to) => getDate(to.params.id));
  return {
    commentInfo,
    activeTagName,
    counts,
  };
}

//#endregion

//#region  获取商品评价列表
function useCommentList() {
  // 存储商品评价数据
  const commentList = ref();
  // 获取路由信息
  const route = useRoute();
  // 参数对象
  const reqParams = ref({
    // 商品id
    id: route.params.id,
    // 当前页码
    page: 1,
    // 每页显示的条数
    pageSize: 10,
    // 是否有图
    hasPicture: false,
    //  评价标记
    tag: "",
    // 排序字段
    sortField: "",
  });
  const getData = () => {
    //  向服务器端发送数据 获取评价列表数据
    getCommentListApi(reqParams.value).then(
      (data) => (commentList.value = data.result)
    );
  };
  // 更新 reqParams
  const updateReqParams = (target) => {
    if (target.tag) {
      reqParams.value = {
        ...reqParams.value,
        hasPicture: target.tag === "有图",
        tag:
          target.tag === "全部评价" || target.tag === "有图" ? "" : target.tag,
      };
    } else {
      reqParams.value = {
        ...reqParams.value,
        ...target,
      };
    }
  };
  // 监听 reqParams 发生变化的时候需要更新数据
  watch(
    () => reqParams.value,
    () => {
      getData();
      console.log(32323232);
    },
    {
      immediate: true,
      // 深度监听
      deep: true,
    }
  );

  // 格式化昵称 兔子tony --> 兔****y
  const formatNickname = (nickName) => {
    return nickName.substr(0, 1) + "****" + nickName.substr(-1);
  };
  // 格式化规格
  const formatAttr = (attrs) => {
    return attrs.map((attr) => `${attr.name}:${attr.nameValue}`).join(" ");
  };
  getData();
  return {
    commentList,
    formatNickname,
    formatAttr,
    updateReqParams,
    reqParams,
  };
}

//#endregion
</script>
<style lang="less" scoped>
.goods-comment {
  .head {
    display: flex;
    padding: 30px 0;

    .data {
      width: 340px;
      display: flex;
      padding: 20px;

      p {
        flex: 1;
        text-align: center;

        span {
          display: block;

          &:first-child {
            font-size: 32px;
            color: @priceColor;
          }

          &:last-child {
            color: #999;
          }
        }
      }
    }

    .tags {
      flex: 1;
      display: flex;
      border-left: 1px solid #f5f5f5;

      .dt {
        font-weight: bold;
        width: 100px;
        text-align: right;
        line-height: 42px;
      }

      .dd {
        flex: 1;
        display: flex;
        flex-wrap: wrap;

        > a {
          width: 132px;
          height: 42px;
          margin-left: 20px;
          margin-bottom: 20px;
          border-radius: 4px;
          border: 1px solid #e4e4e4;
          background: #f5f5f5;
          color: #999;
          text-align: center;
          line-height: 40px;

          &:hover {
            border-color: @xtxColor;
            background: lighten(@xtxColor, 50%);
            color: @xtxColor;
          }

          &.active {
            border-color: @xtxColor;
            background: @xtxColor;
            color: #fff;
          }
        }
      }
    }
  }

  .sort {
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    margin: 0 20px;
    color: #666;

    > span {
      margin-left: 20px;
    }

    > a {
      margin-left: 30px;

      &.active,
      &:hover {
        color: @xtxColor;
      }
    }
  }

  .list {
    padding: 0 20px;

    .item {
      display: flex;
      padding: 25px 10px;
      border-bottom: 1px solid #f5f5f5;

      .user {
        width: 160px;

        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
        }

        span {
          padding-left: 10px;
          color: #666;
        }
      }

      .body {
        flex: 1;

        .score {
          line-height: 40px;

          .iconfont {
            color: #ff9240;
            padding-right: 3px;
          }

          .attr {
            padding-left: 10px;
            color: #666;
          }
        }
      }

      .text {
        color: #666;
        line-height: 24px;
      }

      .time {
        color: #999;
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
      }
    }
  }
}
</style>
