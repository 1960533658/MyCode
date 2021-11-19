<template>
  <div class="home-category">
    <ul class="menu">
      <li v-for="item in categoryList" :key="item.id">
        <RouterLink :to="`/category/${item.id}`">{{ item.name }}</RouterLink>
        <RouterLink
          v-for="sub in item?.children"
          :key="sub.id"
          :to="`/category/sub/${sub.id}`"
          >{{ sub.name }}
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref } from "vue";

export default {
  name: "HomeCategory",
  setup() {
    const store = useStore();
    const brand = ref({
      id: "brand",
      name: "品牌",
      children: [
        {
          id: "children-brand",
          name: "推荐品牌",
        },
      ],
    });
    const categoryList = computed(() => {
      const result = store.state.category.list.map((item) => ({
        ...item,
        children: item.children ? item.children.slice(0, 2) : null,
      }));
      result.push(brand.value);
      return result;
    });
    return {
      categoryList,
    };
  },
};
</script>
<style lang="less" scoped>
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;

  .menu {
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;

      &:hover {
        background-color: @xtxColor;
      }

      a {
        margin-right: 4px;
        color: #fff;

        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
