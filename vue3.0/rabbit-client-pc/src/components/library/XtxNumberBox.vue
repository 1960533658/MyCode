<template>
  <div class="xtx-number-box">
    <div class="label">{{ label }}</div>
    <div class="number-box">
      <a href="javascript:" @click="onCountChanged(-1)">-</a>
      <input :value="count" readonly type="text" />
      <a href="javascript:" @click="onCountChanged(1)">+</a>
    </div>
  </div>
</template>
<script>
import { useVModel } from "@vueuse/core";

export default {
  name: "XtxNumberBox",
  props: {
    modelValue: {
      type: Number,
      default: 1,
    },
    max: {
      type: Number,
      default: 1,
    },
    label: {
      type: String,
      default: "",
    },
  },

  setup(props, { emit }) {
    const count = useVModel(props, "modelValue", emit);
    const onCountChanged = (step) => {
      const nextCount = count.value + step;
      if (nextCount < 1) {
        count.value = 1;
      } else if (nextCount > props.max) {
        count.value = props.max;
      } else {
        count.value = nextCount;
      }
    };
    return { count, onCountChanged };
  },
};
</script>
<style lang="less" scoped>
.xtx-number-box {
  display: flex;
  align-items: center;

  .label {
    width: 60px;
    color: #999;
    padding-left: 10px;
  }

  .number-box {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    display: flex;

    > a {
      width: 29px;
      line-height: 28px;
      text-align: center;
      background: #f8f8f8;
      font-size: 16px;
      color: #666;

      &:first-of-type {
        border-right: 1px solid #e4e4e4;
      }

      &:last-of-type {
        border-left: 1px solid #e4e4e4;
      }
    }

    > input {
      width: 60px;
      padding: 0 5px;
      text-align: center;
      color: #666;
    }
  }
}
</style>
