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
  },
  setup(props) {
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
          console.log(values.selected);
        });
        value.selected = true;
      }
      console.log(value.selected);
    };
    //#endregion

    //#region  规格禁用状态
    const pathMap = createPathMap(props.skus);
    console.log(pathMap);
    updateDisable(props.specs, pathMap);
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
function updateDisable(specs, pathMap) {
  specs.forEach((spec) => {
    spec.values.forEach((value) => {
      console.log(value.name);
      // 如果规格查询对象中当前对象的职位null或者没有这个对象
      if (!pathMap[value.name]) {
        // 禁用当前单个规格
        value.disabled = true;
      }
    });
  });
}

//#region  更新规格禁用状态

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
