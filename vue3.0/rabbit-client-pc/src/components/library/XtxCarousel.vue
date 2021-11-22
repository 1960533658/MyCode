<template>
  <!-- 鼠标移入停止轮播 鼠标离开重新开启轮播  -->
  <div class="xtx-carousel" @mouseenter="stop" @mouseleave="start">
    <ul class="carousel-body">
      <li
        v-for="(item, index) in bannerList"
        :key="item.id"
        :class="{ fade: index === currentIndex }"
        class="carousel-item"
      >
        <RouterLink :to="item.hrefUrl">
          <img :src="item.imgUrl" alt="" />
        </RouterLink>
      </li>
    </ul>
    <a class="carousel-btn prev" href="javascript:" @click="handleStep(-1)"
      ><i class="iconfont icon-angle-left"></i
    ></a>
    <a class="carousel-btn next" href="javascript:" @click="handleStep(1)"
      ><i class="iconfont icon-angle-right"></i
    ></a>
    <div class="carousel-indicator">
      <span
        v-for="(item, index) in bannerList"
        :key="item.id"
        :class="{ active: index === currentIndex }"
        @click="handleCurrent(index)"
      ></span>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from "vue";

export default {
  name: "XtxCarousel",
  props: {
    bannerList: {
      type: Array,
    },
    autoplay: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number,
      default: 3000,
    },
  },
  setup(props) {
    const currentIndex = ref(0);

    //#region  点击左右按钮切换图片
    const handleStep = (step) => {
      // 让currentIndex 通过点击事件传递的值 增加或者减少
      currentIndex.value = currentIndex.value + step;
      //  如果记录的索引 小于 0 就让currentIndex变为最后一个索引
      if (currentIndex.value < 0) {
        currentIndex.value = props.bannerList.length - 1;

        // 如果记录的索引 大于 数据的碎银 就让currentIndex变为0
      } else if (currentIndex.value > props.bannerList.length - 1) {
        currentIndex.value = 0;
      }
    };
    //#endregion
    //#region  点击下方圆点导航 切换对应图片
    const handleCurrent = (index) => {
      currentIndex.value = index;
    };
    //#endregion

    //#region  让轮播图自动轮播
    let timer = null;
    // 开启定时器
    const start = () => {
      // 如果autoPlay属性布尔值为true 且数据中存在图片才能开启定时器
      if (props.autoplay && props.bannerList.length > 1) {
        timer = setInterval(() => {
          // 如果开启定时器 持续调用handleStep 让currentIndex累加
          handleStep(1);
        }, props.duration);
      }
    };
    // 关闭定时器
    const stop = () => {
      // 如果停止轮播 清除定时器
      clearInterval(timer);
    };

    // 当组件挂载 尝试开启开启轮播
    onMounted(start);
    // 当组件卸载 停止轮播
    onUnmounted(stop);
    //#endregion
    return {
      // 点击切换轮播图
      currentIndex,
      handleStep,
      handleCurrent,
      // 自动轮播
      timer,
      start,
      stop,
    };
  },
};
</script>
<style lang="less" scoped>
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;

  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }

    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;

      &.fade {
        opacity: 1;
        z-index: 1;
      }

      img {
        width: 100%;
        height: 100%;
      }
    }

    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;

      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;

        ~ span {
          margin-left: 12px;
        }

        &.active {
          background: #fff;
        }
      }
    }

    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;

      &.prev {
        left: 20px;
      }

      &.next {
        right: 20px;
      }
    }
  }

  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
