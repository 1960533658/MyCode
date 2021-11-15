<template>
  <div id="nav">
    <!--  Vuex 状态管理  -->
    <!--  <useVuex></useVuex>  -->

    <!--  <InputBinding></InputBinding>  -->
    <!-- 组件双向数据绑定 普通版（regular） -->
    <!--  <ComBindingRegular></ComBindingRegular>  -->
    <!-- 组件双向数据绑定 终极版（final） -->
    <!--  <ComBindingFinal></ComBindingFinal>  -->

    <!-- customRef——防抖操作 -->
    <!-- customRef——防抖操作 -->
    <useCustomRefDate></useCustomRefDate>
  </div>
</template>

<script>
//  Vuex 状态管理
// import useVuex from "./components/01.useVuex";
// 表单双向数据绑定
// import InputBinding from "@/components/02.twoWayBinding/InputBinding";

// 组件双向数据绑定 普通版（regular）
// import ComBindingRegular from "@/components/02.twoWayBinding/ComBindingRegular";
// 组件双向数据绑定 终极版（final）
// import ComBindingFinal from "@/components/02.twoWayBinding/ComBindingFinal";

//  customRef——防抖操作
// import useCustomRef from "@/components/03.customRef/useCustomRef";
// customRef——防抖操作
import useCustomRefDate from "@/components/03.customRef/useCustomRefDate";

export default {
  components: {
    // useVuex,
    // InputBinding,
    // ComBindingRegular,
    // ComBindingFinal,
    // useCustomRef,
    useCustomRefDate,
  },
};
</script>
