<template>
  <div class="goods-sku">
    <dl v-for="item in specs" :key="item.name">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="value in item.values" :key="value.name">
          <img
            v-if="value.picture"
            :class="{ selected: value.selected, disabled: value.disabled }"
            :src="value.picture"
            alt="value.name"
            @click="updateSelected(item, value)"
          />
          <span
            v-else
            :class="{ selected: value.selected, disabled: value.disabled }"
            @click="updateSelected(item, value)"
            >{{ value.name }}</span
          >
        </template>
      </dd>
    </dl>
  </div>
</template>
<script>
import powerSet from "../../../vendor/powerSet";

export default {
  name: "GoodsSku",
  // 供用户选择的数据
  props: {
    specs: {
      type: Array,
      default: () => [],
    },
    skus: {
      type: Array,
      default: () => [],
    },
    skuId: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    //#region  图片选中状态切换
    const updateSelected = (item, value) => {
      // 如果当前规格是已被禁用的 禁止代码继续执行
      if (value.disabled) {
        return;
      }
      // 如果选中了再次去点击就取消选中
      if (value.selected) {
        value.selected = false;
        // 如果未选中 点击 就让图片选中
      } else {
        item.values.forEach((values) => {
          values.selected = false;
        });
        value.selected = true;
      }
      // 当用于更新选中状态的时候耶要更新禁用状态
      updateDisable(props.specs, pathMap);

      sendDateToParent(props.specs, pathMap, props.skus, emit);
    };
    //#endregion

    //#region  规格禁用状态
    const pathMap = createPathMap(props.skus);
    // 更新禁止选中状态
    updateDisable(props.specs, pathMap);
    // 设置默认选中规格
    setDefaultSelected(props.skuId, props.specs, props.skus);
    //#endregion
    return {
      updateSelected,
    };
  },
};
//#region  创建规格查询对象
const createPathMap = (skus) => {
  // 创建规格查询对象
  const pathMap = {};
  // 遍历所有可以组合的规格组合对象
  skus.forEach((sku) => {
    // 判断组合对象是否有库存
    if (sku.inventory > 0) {
      const names = sku.specs.map((item) => item.valueName);
      // 完整规格的长度
      const max = names.length;
      // 获取当前可组合的规则名称的子集
      const sets = powerSet(names).filter((item) => item.length > 0);
      sets.forEach((item) => {
        const key = item.join("_");
        if (!(key in pathMap)) {
          if (item.length === max) {
            // 保存完整的规格
            pathMap[key] = sku.id;
          } else {
            // 保存不完整的规格
            pathMap[key] = null;
          }
        }
      });
    }
  });
  return pathMap;
};
//#endregion

//#region  更新规格禁用状态
function updateDisable(specs, pathMap) {
  specs.forEach((spec, index) => {
    // 更新用户选择的规格
    const selected = getSelected(specs);
    spec.values.forEach((value) => {
      // 判断当前规格是否是用户选中的 如果是 就没必要添加到用户选择的数组中
      if (value.selected) return;
      // 将当前遍历到的规格存储到 selected 数组中
      selected[index] = value.name;
      const key = selected.filter((item) => item).join("_");
      if (!(key in pathMap)) {
        // 如果规格查询对象中当前对象的职位null或者没有这个对象
        // 禁用当前单个规格
        value.disabled = true;
      }
    });
  });
}

//#endregion

//#region  获取用户选择的规格
function getSelected(specs) {
  const result = [];
  specs.forEach((spec, index) => {
    const selected = spec.values.find((item) => item.selected);
    if (selected) {
      result[index] = selected.name;
    } else {
      result[index] = undefined;
    }
  });
  return result;
}

//#endregion

//#region  设置规格的默认选中效果
/**
 *设置规格的默认选中效果
 * @param skuId 规格Id
 * @param skus 当前规格所有可选择的规格名称
 * @param specs 即将被设置状态的名称
 */
function setDefaultSelected(skuId, skus, specs) {
  if (!skuId) return;
  const target = skus.find((sku) => sku.id === skuId);
  const names = target.specs.map((spec) => spec.valueName);
  specs.forEach((spec) => {
    spec.values.forEach((value) => {
      if (names.includes(value.name)) {
        value.selected = true;
      }
    });
  });
}

//#endregion

//#region  将用户选择的规格组件传递给父组件以 给 购物车 以备使用
function sendDateToParent(specs, pathMap, skus, emit) {
  // 获取用户选择的规格
  const selected = getSelected(specs).filter((item) => item);
  //  判断用户选择的规格是否完整 完整的话传递给父元素
  if (selected.length === specs.length) {
    const skuId = pathMap[selected.join("_")];
    // 根据 skuId 在所有可组合的规格集合中查找规格对象
    const target = skus.find((sku) => sku.id === skuId);
    //  将规格数据传递到父组件
    emit("onSpecChange", {
      // 商品规格Id 将商品加入购物车使用
      skuId,
      // 现价 更新视图
      price: target.price,
      // 原价 更新视图
      oldPrice: target.oldPrice,
      // 商品的库存 在用户更改商品数量时使用
      inventory: target.inventory,
    });
  }
}

//#endregion
</script>
<style lang="less" scoped>
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  margin-bottom: 10px;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}

.goods-sku {
  padding-left: 10px;
  padding-top: 20px;

  dl {
    display: flex;
    padding-bottom: 5px;
    align-items: center;

    dt {
      width: 50px;
      color: #999;
    }

    dd {
      flex: 1;
      color: #666;

      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }

      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
