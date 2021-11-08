<template>
  <div>
    <h1>响应式组件状态-Reactive</h1>
    <p>{{student.name}} {{student.age}}岁</p>
    <button @click="hanldeClick">button</button>
  </div>
</template>

<script>
import {reactive} from "vue"
export default {
  setup() {
    const student = reactive({
      name: "kangknag",
      age: 18
    })
    const hanldeClick = () => {
      student.name = "康康",
      student.age = 20
    }
    return {
      student,
      hanldeClick
    }
  },
};
</script>