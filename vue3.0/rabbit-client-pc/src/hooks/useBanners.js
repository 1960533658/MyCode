import { getBannersApi } from "../api/home";
import { ref } from "vue";

export default function useBanners() {
  const bannerList = ref(null);

  const getBannerData = (distributionSite) => {
    getBannersApi(distributionSite).then((data) => {
      bannerList.value = data.result;
    });
  };

  return { bannerList, getBannerData };
}
