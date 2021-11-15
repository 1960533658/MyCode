<template>
  <div class="index">
    <!-- 使用Vuex——State  -->
    <h1>{{ $store.state.name }}</h1>
    <h1>{{ $store.state.aaa }}</h1>

    <!--  使用Vuex——getters  -->
    <h1>{{ $store.getters.newNames }}</h1>
    <!--    使用Vuex——mutations-->
    <button @click="handle1">把state.name替换为kangkang</button>
    <!--    使用Vuex——actions-->
    <button @click="handle2">把state.name替换为康某</button>
    <!--    使用Vuex——modules模块化获取数据-->
    <p>非命名空间</p>
    <p>{{ $store.state.moduleA.name }}</p>
    <p>{{ $store.state.moduleB.name }}</p>
    <button @click="handle3">
      看看触发一个非命名空间模块中的方法是否会影响到别的非命名空间
    </button>
    <p>命名空间</p>
    <p>{{ $store.state.nameSpaceA.name }}</p>
    <p>{{ $store.state.nameSpaceB.name }}</p>
    <button @click="handle4">修改nameSpaceA的名字</button>
    <button @click="handle5">修改nameSpaceB的名字</button>
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    // 使用Vuex——State
    console.log(store.state.name);
    console.log(store.state.aaa);

    //  使用Vuex——getters
    console.log(store.getters.newNames);

    //  使用Vuex——mutations
    const handle1 = () => {
      store.commit("updateNames", "kangkang");
    };
    //  使用Vuex——actions
    const handle2 = () => {
      store.dispatch("moduleA/updateName");
    };

    //  使用Vuex——modules 非命名模块
    console.log(store.state.moduleA.name);
    console.log(store.state.moduleB.name);
    const handle3 = () => {
      store.commit("updateNames");
    };
    //  使用Vuex——modules 命名模块
    console.log(store.state.nameSpaceA);
    console.log(store.state.nameSpaceB);
    console.log(store);
    const handle4 = () => {
      store.commit("nameSpaceA/updateNames");
    };
    const handle5 = () => {
      store.commit("nameSpaceB/updateNames");
    };
    return {
      handle1,
      handle2,
      handle3,
      handle4,
      handle5,
    };
  },
};
</script>
