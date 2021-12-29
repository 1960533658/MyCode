<template>
  <div class="xtx-pagination">
    <a v-if="currentPage > 1" href="javascript:" @click="onChangePage(-1)"
      >上一页</a
    >
    <span v-if="pageInfo.pageNumArr[0] > 1">...</span>
    <a
      v-for="item in pageInfo.pageNumArr"
      :key="item"
      :class="{ active: currentPage === item }"
      href="javascript:"
      @click="currentPage = item"
      >{{ item }}</a
    >
    <span v-if="pageInfo.pageNumArr[pageInfo.pageNumArr.length - 1] < totalPage"
      >...</span
    >
    <a
      v-if="currentPage < totalPage"
      href="javascript:"
      @click="onChangePage(1)"
      >下一页</a
    >
  </div>
</template>
<script>
import { computed, ref } from "vue";
import { useVModel } from "@vueuse/core";

export default {
  name: "XtxPagination",
  props: {
    page: {
      type: Number,
      default: 1,
    },
    counts: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { emit }) {
    // 当前页
    const currentPage = useVModel(props, "page", emit);
    // 最先显示页数
    const pageButtonMax = 5;
    // 总数居条数
    const total = computed(() => props.counts);
    // 煤业显示数据条数
    const pageSize = ref(10);
    // 页码偏移量
    const pageOffset = Math.floor(pageButtonMax / 2);
    // 总页数
    const totalPage = Math.ceil(total.value / pageSize.value);

    const onChangePage = (stem) => {
      currentPage.value = currentPage.value + stem;
      if (currentPage.value < 1) {
        currentPage.value = 1;
      } else if (currentPage.value > totalPage) {
        currentPage.value = totalPage;
      }
    };
    // 计算开始结束页码之
    const pageInfo = computed(() => {
      let start = currentPage.value - pageOffset;
      let end = pageButtonMax + start - 1;
      if (start < 1) {
        start = 1;
        let temp = pageButtonMax + start - 1;
        end = temp > totalPage ? totalPage : temp;
      }
      if (end > totalPage) {
        end = totalPage;
        let temp = end - pageButtonMax + 1;
        start = temp < 1 ? 1 : temp;
      }
      // 存储页码的数据
      const pageNumArr = [];
      for (let i = start; i <= end; i++) {
        pageNumArr.push(i);
      }
      return {
        pageNumArr,
      };
    });
    return {
      currentPage,
      pageInfo,
      onChangePage,
      totalPage,
    };
  },
};
</script>
<style lang="less" scoped>
.xtx-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;

  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;

    &:hover {
      color: @xtxColor;
    }

    &.active {
      background: @xtxColor;
      color: #fff;
      border-color: @xtxColor;
    }

    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;

      &:hover {
        color: #333;
      }
    }
  }

  > span {
    margin-right: 10px;
  }
}
</style>
