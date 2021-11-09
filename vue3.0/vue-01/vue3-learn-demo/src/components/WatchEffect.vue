<template>
  <div class="watcheffect">
    <h1>数据监听——watchEffect</h1>
    <div>
      <input type="text" v-model="firstname">
      <input type="text" v-model="lastname">
    </div>
  </div>
</template>

<script>
    import { ref, watchEffect } from "vue"
  export default {
    setup() {
      const firstname = ref("");
      const lastname = ref("");
      watchEffect(() => {
        console.log(firstname.value)
        console.log(lastname.value)
      })
      return {
        firstname,
        lastname
      }
    }
  }
</script>