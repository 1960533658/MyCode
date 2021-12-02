<template>
  <div class="sub-sort">
    <div class="sort">
      <a
        :class="{ active: sortParams.sortField === '' }"
        href="javascript:"
        @click.prevent="
          updateSortMethod({
            sortField: '',
            sortMethod: 'desc',
          })
        "
        >默认排序</a
      >
      <a
        :class="{ active: sortParams.sortField === 'publishTime' }"
        href="javascript:"
        @click.prevent="
          updateSortMethod({
            sortField: 'publishTime',
          })
        "
        >最新商品</a
      >
      <a
        :class="{ active: sortParams.sortField === 'orderNum' }"
        href="javascript:"
        @click.prevent="
          updateSortMethod({
            sortField: 'orderNum',
          })
        "
        >最高人气</a
      >
      <a
        :class="{ active: sortParams.sortField === 'price' }"
        href="javascript:"
        @click.prevent="
          updateSortMethod({
            sortField: 'price',
          })
        "
        >评论最多</a
      >
      <a
        :class="{ active: sortParams.sortField === 'evaluateNum' }"
        href="javascript:"
        @click.prevent="
          updateSortMethod({
            sortField: 'evaluateNum',
            sortMethod: sortParams.sortMethod === 'desc' ? 'asc' : 'desc',
          })
        "
      >
        价格排序
        <i
          :class="{ active: sortParams.sortMethod === 'asc' }"
          class="arrow up"
        ></i>
        <i
          :class="{ active: sortParams.sortMethod === 'desc' }"
          class="arrow down"
        ></i>
      </a>
    </div>
    <div class="check">
      <XtxCheckbox
        v-model="sortParams.inventory"
        @update:modelValue="updateSortMethod({ inventory: $event })"
        >仅显示有货商品
      </XtxCheckbox>
      <XtxCheckbox
        v-model="sortParams.onlyDiscount"
        @update:modelValue="updateSortMethod({ onlyDiscount: $event })"
        >仅显示特惠商品
      </XtxCheckbox>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";

export default {
  name: "SubSort",
  setup(props, { emit }) {
    // 排序条件
    // 更新排序条件的方法
    const { sortParams, updateSortMethod } = useSort(emit);
    return {
      sortParams,
      updateSortMethod,
    };
  },
};

// 排序方法
function useSort(emit) {
  const sortParams = ref({
    // 排序方式
    sortField: "",
    // 排序方法
    sortMethod: "",
    // 是否只显示有货商品
    inventory: false,
    // 是否只显示特惠商品
    onlyDiscount: false,
  });
  // 更新排序条件的方法
  const updateSortMethod = (target) => {
    // 使用最新的排序方法覆盖旧的排序方法
    sortParams.value = {
      ...sortParams.value,
      ...target,
    };
    // 将用户选择的排序条件传递给父组件
    emit("onSortChanged", sortParams.value);
  };
  return { sortParams, updateSortMethod };
}
</script>
<style lang="less" scoped>
.sub-sort {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .sort {
    display: flex;

    a {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all 0.3s;

      &.active {
        background: @xtxColor;
        border-color: @xtxColor;
        color: #fff;
      }

      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;

        &.up {
          top: 3px;
          border-bottom-color: #bbb;

          &.active {
            border-bottom-color: @xtxColor;
          }
        }

        &.down {
          top: 15px;
          border-top-color: #bbb;

          &.active {
            border-top-color: @xtxColor;
          }
        }
      }
    }
  }

  .check {
    .xtx-checkbox {
      margin-left: 20px;
      color: #999;
    }
  }
}
</style>
