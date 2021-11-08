<template>
  <div class="toRefs">
    <h1>批量数据转换——toRefs</h1>
    <p>{{name}}</p>
    <p>{{age}}</p>
    <p>{{like}}</p>
    <dl> 关于like
      <dd>{{food}}</dd>
      <dd>{{play}}</dd>
    </dl>
  </div>
</template>

<script>
import {} from "vue"
export default {
  setup() {
    const person = {
      name: "kangkang",
      age: 10,
      like: {
        food: "mike",
        play: "game"
      }
    }

    return {
      ...person,
      ...person.like
    }
  }
};
</script>