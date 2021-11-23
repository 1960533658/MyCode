<template>
  <div class="home-skeleton">
    <div v-for="i in 4" :key="i" :style="{ backgroundColor: bg }" class="item">
      <XtxSkeleton
        animated="scroll"
        bg="#e4e4e4"
        height="306px"
        width="306px"
      />
      <XtxSkeleton animated="scroll" bg="#e4e4e4" height="24px" width="160px" />
      <XtxSkeleton animated="scroll" bg="#e4e4e4" height="24px" width="120px" />
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeSkeleton",
  props: {
    bg: {
      type: String,
      default: "#fff",
    },
  },
};
</script>

<style lang="less" scoped>
.home-skeleton {
  width: 1240px;
  height: 406px;
  display: flex;
  justify-content: space-between;

  .item {
    width: 306px;

    .xtx-skeleton ~ .xtx-skeleton {
      display: block;
      margin: 16px auto 0;
    }
  }
}

.fade {
  &-leave {
    &-active {
      position: absolute;
      width: 100%;
      transition: opacity 0.5s 0.2s;
      z-index: 1;
    }

    &-to {
      opacity: 0;
    }
  }
}

.home-skeleton {
  top: 115px;
}
</style>
