<template>
  <div class="xtx-checkbox" @click="changeChecked">
    <i v-if="isChecked" class="iconfont icon-checked"></i>
    <i v-else class="iconfont icon-unchecked"></i>
    <span><slot /></span>
  </div>
</template>
<script>
import { useVModel } from "@vueuse/core";

export default {
  name: "XtxCheckbox",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    //#region  使用vue/use首先双向数据绑定
    const isChecked = useVModel(props, "modelValue", emit);
    const changeChecked = () => {
      isChecked.value = !isChecked.value;
    };
    return {
      isChecked,
      changeChecked,
    };
    //#endregion
  },

  //#region  vue实现双向数据绑定
  // const isChecked = ref(false);
  //   const changeChecked = () => {
  //     isChecked.value = !isChecked.value;
  //     emit("update:modelValue", isChecked.value);
  //   };
  //   // 双向数据绑定——当数据modelValue发生变化isChecked也要发生变化
  //   watch(
  //     () => props.modelValue,
  //     () => {
  //       isChecked.value = props.modelValue;
  //     }
  //   );
  //#endregion
};
</script>
<style lang="less" scoped>
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;

  .icon-checked {
    color: @xtxColor;

    ~ span {
      color: @xtxColor;
    }
  }

  i {
    position: relative;
    top: 1px;
  }

  span {
    margin-left: 2px;
  }
}
</style>
