<template>
  <ul>
    <li v-for="item in goodsList" :key="item.id">
      <GoodsItem :goods="item" />
    </li>
  </ul>
</template>
<script>
import GoodsItem from "./GoodsItem";

export default {
  name: "GoodsList",
  components: { GoodsItem },
  props: {
    goodsList: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="less" scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  padding: 0 5px;

  li {
    margin-right: 20px;
    margin-bottom: 20px;

    &:nth-child(5n) {
      margin-right: 0;
    }
  }
}
</style>
