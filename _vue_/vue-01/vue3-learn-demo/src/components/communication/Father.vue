<template>
  <div class="father">
    <h1>父组件</h1>
    <Son :forSon="forSon"></Son>
    <button @click="cacle">按钮</button>
  </div>
</template>

<script>
import Son from './Son.vue'
import {ref} from "vue"
export default {
  components: { Son },
  setup() {
    const forSon = ref("我是你爸爸")
    const cacle = () => {
      forSon.value = "你收到了吗"
    }
    return {
      forSon,
      cacle
    }
  }
}
</script>