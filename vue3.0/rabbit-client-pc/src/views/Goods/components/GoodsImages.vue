<template>
  <div class="goods-image">
    <div
      v-show="bigImage"
      :style="{
        backgroundImage: `url(${imagesList[current]})`,
        backgroundPositionX: bgPosition.x + 'px',
        backgroundPositionY: bgPosition.y + 'px',
      }"
      class="large"
    ></div>
    <div ref="target" class="middle">
      <img :src="imagesList[current]" alt="" />
      <div
        v-show="bigImage"
        :style="{
          left: layerPosition.left + 'px',
          top: layerPosition.top + 'px',
        }"
        class="layer"
      ></div>
    </div>
    <ul class="small">
      <li
        v-for="(item, index) in imagesList"
        :key="index"
        :class="{ active: current === index }"
        @click="handleChangeCurrent(index)"
      >
        <img :src="item" alt="" />
      </li>
    </ul>
  </div>
</template>
<script>
import { ref, watch } from "vue";
import { useMouseInElement } from "@vueuse/core";

export default {
  name: "GoodsImages",
  props: {
    imagesList: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    //#region  控制图片点击切换
    // 控制显示高亮图片
    const current = ref(0);
    // 更改current
    const handleChangeCurrent = (index) => {
      current.value = index;
    };
    //#endregion
    //#region  鼠标悬浮预览图片
    // 控制镜片和大图书否显示
    const bigImage = ref(false);
    // 获取中图DOM对象
    const target = ref(null);
    /**
     * @param isOutSide true 在元素外部 false在元素内部
     * @param elementX 距离元素X轴（Number）
     * @param elementY 距离元素Y轴（Number）
     */
    const { isOutside, elementX, elementY } = useMouseInElement(target);
    // 存储镜片元素未知
    const layerPosition = ref({ left: 0, top: 0 });
    // 用于存储大图存储位置
    const bgPosition = ref({ left: 0, top: 0 });

    // 监听鼠标是否进入可视区，进入可视区之后元素再中图元素中的X、Y坐标轴
    watch([isOutside, elementX, elementY], ([isOut, x, y]) => {
      // 当鼠标不在元素中 让预览大图隐藏
      if (isOut) {
        bigImage.value = false;
        // 当元素在元素中 让预览大图显示
      } else {
        bigImage.value = true;
        // 控制阴影区域在一定的范围内在鼠标的中间位置的位置
        layerPosition.value = {
          left: x - 100,
          top: y - 100,
        };
        // 控制阴影区域 不能移出图片位置
        if (layerPosition.value.left < 0) {
          layerPosition.value.left = 0;
        } else if (layerPosition.value.left > 200) {
          layerPosition.value.left = 200;
        }
        if (layerPosition.value.top < 0) {
          layerPosition.value.top = 0;
        } else if (layerPosition.value.top > 200) {
          layerPosition.value.top = 200;
        }

        // 由于显示的图片与大图图片的关系是2倍图 设置背景大图位置
        bgPosition.value = {
          x: -layerPosition.value.left * 2,
          y: -layerPosition.value.top * 2,
        };
      }
    });
    //#endregion
    return {
      current,
      handleChangeCurrent,
      // 镜像显示图片
      target,
      bigImage,
      layerPosition,
      bgPosition,
    };
  },
};
</script>
<style lang="less" scoped>
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 500;

  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }

  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    cursor: move;

    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }

  .small {
    width: 80px;

    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;

      &:hover,
      &.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>
