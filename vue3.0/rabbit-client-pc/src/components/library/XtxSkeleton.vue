<template>
  <div :class="animated" :style="{ width, height }" class="xtx-skeleton">
    <!-- 1 盒子-->
    <div :style="{ backgroundColor: bg }" class="block"></div>
    <!-- 2 闪效果 xtx-skeleton 伪元素 --->
  </div>
</template>
<script>
export default {
  name: "XtxSkeleton",
  // 使用的时候需要动态设置 高度，宽度，背景颜色，动画效果
  props: {
    bg: {
      type: String,
      default: "#efefef",
    },
    width: {
      type: String,
      default: "100px",
    },
    height: {
      type: String,
      default: "100px",
    },
    animated: {
      type: String,
      default: "scroll", // 'fade'
    },
  },
};
</script>
<style lang="less" scoped>
.xtx-skeleton {
  display: inline-block;
  position: relative;
  overflow: hidden;
  vertical-align: middle;

  .block {
    width: 100%;
    height: 100%;
    border-radius: 2px;
  }
}

@keyframes scroll {
  0% {
    left: -100%;
  }
  100% {
    left: 120%;
  }
}

@keyframes fade {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 1;
  }
}

.scroll {
  &::after {
    content: "";
    position: absolute;
    animation: scroll 1.5s ease 0s infinite;
    top: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      to left,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: skewX(-45deg);
  }
}

.fade {
  animation: fade 1s linear infinite alternate;
}
</style>
