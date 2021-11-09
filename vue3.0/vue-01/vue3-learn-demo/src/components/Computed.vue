<template>
  <div>
    <h1>计算属性——computed</h1>
    <input type="text" v-model="keyword">
    <ul>
      <li v-for="(item,index) in filterNames" :key="index">{{item}}</li>
    </ul>
  </div>
</template>
<script>
import { ref,computed} from "vue"
export default {
  setup() {
    const list = ref([
      "林俊杰",
      "孙燕姿",
      "周杰伦",
      "张惠妹",
      "刘若英",
      "林宥嘉",
      "刘德华",
      "张韶涵",
      "周笔畅",
      "孙楠",
    ]);
    const keyword = ref("");
    const filterNames = computed(() => {
      return list.value.filter(item => item.includes(keyword.value))
    })
    return {
      keyword,
      filterNames
    }
  }
}
</script>