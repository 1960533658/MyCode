<template>
  <div ref="target" class="xtx-infinite-loading">
    <div v-if="loading" class="loading">
      <span class="img"></span>
      <span class="text">正在加载...</span>
    </div>
    <div v-if="finished" class="none">
      <span class="img"></span>
      <span class="text">亲，没有更多了</span>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { useIntersectionObserver } from "@vueuse/core";

export default {
  name: "XtxInfiniteLoading",
  props: {
    // 控制加载是否显示
    loading: {
      type: Boolean,
      default: false,
    },
    // 控制是否还有更多数据可以加载 显示
    finished: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const target = ref(null);
    // 监听元素书否进入可视区
    useIntersectionObserver(target, ([{ isIntersecting }]) => {
      // 如果元素进入了可视区
      if (isIntersecting) {
        // 如果没有正在加载数据 并且还有可以继续加载的数据
        if (!props.loading && !props.finished) {
          emit("infinite");
        }
      }
    });
    return { target };
  },
};
</script>
<style lang="less" scoped>
.xtx-infinite-loading {
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;

    .img {
      width: 50px;
      height: 50px;
      background: url(../../assets/images/load.gif) no-repeat center / contain;
    }

    .text {
      color: #999;
      font-size: 16px;
    }
  }

  .none {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;

    .img {
      width: 200px;
      height: 134px;
      background: url(../../assets/images/none.png) no-repeat center / contain;
    }

    .text {
      color: #999;
      font-size: 16px;
    }
  }
}
</style>
