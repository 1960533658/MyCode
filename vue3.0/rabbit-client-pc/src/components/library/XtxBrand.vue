<script>
import { h } from "vue";

export default {
  name: "XtxBrand",
  render() {
    const items = this.$slots.default();
    // 存储最终的布局结构
    const result = [];
    // 遍历面包屑选项 在出了最后一项之间添加 >
    items.forEach((item, index) => {
      result.push(item);
      if (index < items.length - 1) {
        // 如果不是最后一项
        result.push(h("i", { class: "iconfont icon-angle-right" }));
      }
    });
    return h("div", { class: "xtx-bread" }, result);
  },
};
</script>

<style lang="less" scoped>
.xtx-bread {
  display: flex;
  padding: 25px 10px;

  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
