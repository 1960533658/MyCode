<template>
  <div ref="target" class="xtx-city">
    <div :class="{ active: cityVisible }" class="select" @click="toggle">
      <span v-if="!location" class="placeholder">请选择配送地址</span>
      <span v-else class="value">{{ location }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div v-if="cityVisible" class="option">
      <template v-if="cityData">
        <span
          v-for="item in list"
          :key="item.id"
          class="ellipsis"
          @click="updateSelectCity(item)"
          >{{ item.name }}</span
        >
      </template>
      <template v-else>
        <div class="loading"></div>
      </template>
    </div>
  </div>
</template>
<script>
import { computed, reactive, ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import axios from "axios";

export default {
  name: "XtxCity",
  setup(props, { emit }) {
    //#region  控制城市选择组件的显示与隐藏
    // 存储城市数据
    const cityData = ref(null);
    // 控制城市选择组件是否显示
    const cityVisible = ref(false);
    // 获取下拉框元素
    const target = ref(null);
    // 切换显示隐藏 城市选择组件
    const show = () => {
      getCityData().then((data) => {
        cityData.value = data;
      });
      cityVisible.value = true;
    };
    const hide = () => {
      cityVisible.value = false;
      // 判断用户是否选择了完整的生市级数据
      if (selectedCityData.countName) {
        location.value = `${selectedCityData.provinceName} ${selectedCityData.cityName} ${selectedCityData.countName}`;
      }
      // 每当页面隐藏重置用户的选择
      for (let attr in selectedCityData) {
        selectedCityData[attr] = "";
      }
    };
    const toggle = () => {
      cityVisible.value ? hide() : show();
    };
    // 点击城市选择组件外部时让元素隐藏
    onClickOutside(target, () => {
      hide();
    });
    //#endregion

    //#region  更新城市选择
    // 存储选择的城市 code 用于发送服务器端， name用户模板渲染
    const selectedCityData = reactive({
      provinceCode: "",
      cityCode: "",
      countCode: "",
      provinceName: "",
      cityName: "",
      countName: "",
      location: "",
    });
    // 用于展示选择的省市区数据
    const location = ref("");
    // 记录用户的选择
    const updateSelectCity = (city) => {
      // 存储省级数据
      if (city.level === 0) {
        selectedCityData.provinceCode = city.code;
        selectedCityData.provinceName = city.name;
        // 存储市级数据
      } else if (city.level === 1) {
        selectedCityData.cityCode = city.code;
        selectedCityData.cityName = city.name;
      } else if (city.level === 2) {
        selectedCityData.countCode = city.code;
        selectedCityData.countName = city.name;
        selectedCityData.location = `${selectedCityData.provinceName} ${selectedCityData.cityName} ${selectedCityData.countName}`;
      }
    };
    // 声明计算属性选择完毕之后 显示下一级的城市数据 选择完毕之后重置组件显示数据 将选择好的数据返回给父组件
    const list = computed(() => {
      let list = cityData.value;
      // 如果用户选择了省级数据
      if (selectedCityData.provinceCode) {
        // 将数据更新为市级数据
        list = list.find(
          (province) => province.code === selectedCityData.provinceCode
        ).areaList;
      }
      // 如果用户已经选择了市级数据
      if (selectedCityData.cityCode) {
        // 将数据替换为县级
        list = list.find(
          (city) => city.code === selectedCityData.cityCode
        ).areaList;
      }
      // 如果选择了县级数据
      if (selectedCityData.countCode) {
        const { provinceCode, cityCode, countCode } = selectedCityData;
        emit("onCityChanged", { provinceCode, cityCode, countCode });
        // 重置级联列表
        list = cityData.value;
        // 隐藏省市级弹窗
        hide();
      }
      return list;
    });
    //#endregion
    return {
      cityVisible,
      target,
      toggle,
      cityData,
      updateSelectCity,
      list,
      location,
    };
  },
};

// 在window对象中缓存城市对象
window.cityData = null;

// 获取城市数据的方法
async function getCityData() {
  // 如果window对象中拥有数据 直接返回window中获取数据
  if (window.cityData) return window.cityData;
  // 如果没有数据 从服务器端获取城市数据
  let data = await axios
    .get(
      "https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json"
    )
    .then((response) => response.data);
  return (window.cityData = data);
}
</script>
<style lang="less" scoped>
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;

  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;

    &.active {
      background: #fff;
    }

    .placeholder {
      color: #999;
    }

    .value {
      color: #666;
      font-size: 12px;
    }

    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }

  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;

    .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/images/loading.gif) no-repeat center;
    }

    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;

      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
