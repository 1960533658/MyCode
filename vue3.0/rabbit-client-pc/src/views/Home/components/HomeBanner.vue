<template>
  <div class="home-banner">
    <XtxCarousel
      v-if="bannerList"
      :autoplay="true"
      :bannerList="bannerList"
      :duration="3000"
    />
  </div>
</template>
<script>
import { getBannersApi } from "../../../api/home";
import { ref } from "vue";

export default {
  name: "HomeBanner",
  setup() {
    const { bannerList, getBannerData } = useBanners();
    getBannerData();
    return { bannerList };
  },
};

function useBanners() {
  const bannerList = ref(null);

  const getBannerData = () => {
    getBannersApi().then((data) => {
      bannerList.value = data.result;
    });
  };

  return { bannerList, getBannerData };
}
</script>
<style lang="less" scoped>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;

  .xtx-carousel {
    :deep(.carousel-btn.prev) {
      left: 270px;
    }

    :deep(.carousel-indicator) {
      padding-left: 250px;
    }
  }
}
</style>
