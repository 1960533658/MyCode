<template>
  <div class="ComBinding">
    <TestTemplate v-model="firstName"></TestTemplate>
    <button @click="handle">我是ComBindingRegular组件中的Button</button>
  </div>
</template>

<script>
import { ref } from "vue";
import TestTemplate from "@/components/02.twoWayBinding/TestTemplate";

export default {
  components: {
    TestTemplate,
  },
  setup() {
    const firstName = ref("康康");
    const handle = () => {
      firstName.value = "kangkang";
    };
    return {
      firstName,
      handle,
    };
  },
};
</script>
