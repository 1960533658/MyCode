<template>
  <div class="combindingfinal">
    <FinalTest
      v-model:firstName="firstName"
      v-model:last-name="lastName"
    ></FinalTest>
    <button @click="handle">我是ComBindingFinal组件中的Button</button>
  </div>
</template>

<script>
import { ref } from "vue";
import FinalTest from "@/components/02.twoWayBinding/FinalTest";

export default {
  components: {
    FinalTest,
  },
  setup() {
    const firstName = ref("康康");
    const lastName = ref("springLong");
    const handle = () => {
      firstName.value = "kangkang";
      lastName.value = "Spring_Long";
    };
    return {
      firstName,
      lastName,
      handle,
    };
  },
};
</script>
