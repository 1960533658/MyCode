<template>
  <div>
    <h1>toRef函数</h1>
    <p>person直接插值{{person}}</p>
    <p>toRef直接显示年龄{{age}}</p>
    <button @click="changeAge">按钮</button>
  </div>
</template>

<script>
import { ref, toRef } from "vue"
export default {
  setup() {
    const person = ref({
      name: "kangkang",
      age: 10
    })
    const changeAge = () => {
      person.value.age = 20
    }
    return {
      person,
      age: toRef(person.value,"age"),
      changeAge
    }
  }
}
</script>