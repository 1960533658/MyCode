<template>
  <!-- 筛选区 -->
  <div v-if="subFiltersList && !filterLoading" class="sub-filter">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a
          v-for="brand in subFiltersList?.brands"
          :key="brand.id"
          :class="{
            active: subFiltersList.filterSelectedBrandId === brand.id,
          }"
          href="javascript:"
          @click.prevent="saveSelectedBrandId(brand.id)"
        >
          {{ brand.name }}
        </a>
      </div>
    </div>
    <div
      v-for="item in subFiltersList?.saleProperties"
      :key="item.id"
      class="item"
    >
      <div class="head">{{ item.name }}：</div>
      <div class="body">
        <a
          v-for="properties in item.properties"
          :key="properties.id"
          :class="{ active: item.filterSelectedName === properties.name }"
          href="javascript:"
          @click.prevent="
            saveSelectedPropertiesAttr({
              id: properties.id,
              attr: properties.name,
            })
          "
          >{{ properties.name }}</a
        >
      </div>
    </div>
  </div>
  <!-- 骨架屏 -->
  <div v-else class="sub-filter">
    <XtxSkeleton class="item" height="40px" width="800px" />
    <XtxSkeleton class="item" height="40px" width="800px" />
    <XtxSkeleton class="item" height="40px" width="600px" />
    <XtxSkeleton class="item" height="40px" width="600px" />
    <XtxSkeleton class="item" height="40px" width="600px" />
  </div>
</template>
<script>
import { ref } from "vue";
import { getSubCategoryFilterById } from "../../../api/category";
import { onBeforeRouteUpdate, useRoute } from "vue-router";

export default {
  name: "SubFilter",
  emits: ["onFilterChange"],
  setup(props, { emit }) {
    const route = useRoute();
    const { subFiltersList, getData, updateSeletedFilter, filterLoading } =
      useFilters(emit);
    getData(route.params.id);

    // 存储筛选条件的品牌id
    const saveSelectedBrandId = (id) => {
      subFiltersList.value.filterSelectedBrandId = id;
      updateSeletedFilter();
    };

    // 存储筛选条件的产品属性
    const saveSelectedPropertiesAttr = ({ id, attr }) => {
      subFiltersList.value.saleProperties.forEach((item) => {
        item.properties.forEach((sub) => {
          if (sub.id === id) {
            item.filterSelectedName = attr;
          }
        });
      });
      updateSeletedFilter();
    };

    return {
      subFiltersList,
      // 存储筛选条件的品牌id
      saveSelectedBrandId,
      saveSelectedPropertiesAttr,
      updateSeletedFilter,
      filterLoading,
    };
  },
};

// 获取筛选条件
function useFilters(emit) {
  // 存储获取到的筛选条件数据
  const subFiltersList = ref();
  // 存储最终汇总的筛选条件数据
  const seletedFilter = {
    brandId: null,
    attrs: [],
  };
  // 汇总用户的最终筛选条件
  const updateSeletedFilter = () => {
    // 清除上一次最终筛选数据
    seletedFilter.attrs = [];
    // 把数据中当前的商品id保存给最终 筛选条件数据
    seletedFilter.brandId = subFiltersList.value.filterSelectedBrandId;
    subFiltersList.value.saleProperties.forEach((item) => {
      // 如果用户选择了筛选条件并且筛选条件不是全部
      if (item.filterSelectedName && item.filterSelectedName !== "全部") {
        // 将用户选择的筛选条件存储在 attrs数组中
        seletedFilter.attrs.push({
          // 筛选类别的名字
          groupName: item.name,
          // 筛选条件的名字
          propertyName: item.filterSelectedName,
        });
      }
    });
    // 触发父元素的自定义事件 把筛选好的条件传递给父组件
    emit("onFilterChange", seletedFilter);
  };
  // 表示是否正在加载数据
  const filterLoading = ref(false);
  // 获取筛选条件的方法
  const getData = (id) => {
    filterLoading.value = true;
    getSubCategoryFilterById(id).then((data) => {
      // 给品牌添加“全部”选项
      data.result.brands.unshift({ name: "全部", id: null });
      // 添加初始数据：全部 让全部选项默认选中
      data.result.filterSelectedBrandId = null;
      // 给其他筛选条件 添加 “全部” 选项
      data.result.saleProperties.forEach((item) => {
        item.properties.unshift({ name: "全部", id: null });
        // 添加初始数据：全部 让全部选项默认选中
        item.filterSelectedName = "全部";
      });
      subFiltersList.value = data.result;
      // 更新数据加载状态
      filterLoading.value = false;
    });
  };
  // 当点击二级分类选项跳转路径数据不会更新
  onBeforeRouteUpdate((to) => getData(to.params.id));
  return {
    getData,
    subFiltersList,
    updateSeletedFilter,
    seletedFilter,
    filterLoading,
  };
}
</script>
<style lang="less" scoped>
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;

  .item {
    display: flex;
    line-height: 40px;

    .head {
      width: 80px;
      color: #999;
    }

    .body {
      flex: 1;

      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;

        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}

.xtx-skeleton {
  padding: 10px 0;
}
</style>
