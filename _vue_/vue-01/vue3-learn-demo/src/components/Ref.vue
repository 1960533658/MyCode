<template>
  <div>
    <h1>响应式组件状态 ref</h1>
    <p>Ref——普通数据类型</p>
    <strong>{{name}}</strong>
    <p>Ref——引用数据类型</p>
    <strong>{{person.name}} {{person.age}}岁</strong>
    <button @click="handleClick">替换名字</button>
  </div>
</template>

<script>
import { ref } from "vue"

export default {
  setup () {
    
    //#region  ref创建普通数据类型响应式数据
    const name = ref("张三")
    const handleClick = () => {
      name.value = "李四"
      person.value.name = "kangknag"
    }
    //#endregion
    
    //#region  reactive创建引用数据类型响应式数据
    const person = ref({
      name: "王五",
      age: 20
    })
    //#endregion
    
    return {
      name,
      person,
      handleClick
    }
  }
  
}
</script>