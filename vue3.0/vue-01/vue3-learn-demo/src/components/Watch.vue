<template>
  <div class="watch">
    <h1>监听状态——Watch</h1>
    <ul>
      <li>
        <p>watch监听ref创建的基本数据类型</p>
        <input type="text" v-model="ref_text1" />
      </li>
      <li>
        <p>watch监听ref创建的引用数据类型</p>
        <span>{{ person.name }} {{ person.order.devlop }}</span>
        <button @click="hanldeClick">按钮</button>
      </li>
      <li>
        <p>watch监听reactive创建的响应式数据</p>
        <span>{{ student.name }}</span>
        <button @click="changeReactive">按钮</button>
      </li>
      <li>
        <p>watch监听多条数据</p>
        <input type="text" v-model="firstname" />
        <input type="text" v-model="lastname" />
      </li>
    </ul>
  </div>
</template>
<script>
import { reactive, ref, watch } from "vue";
export default {
  setup() {
    //#region  使用watch监听ref创建的响应式数据 （基于基本数据类型）
    const ref_text1 = ref("");
    /**
     * @text params 监听的参数
     * @current params 监听参数的最新值
     * @previous params, 监听参数变化之前的值
     */
    watch(ref_text1, (current, previous) => {
      console.log(current, "current");
      console.log(previous, "previous");
    });
    //#endregion

    //#region  使用watch监听基于ref创建的响应式数据类型（引用数据类型）
    const person = ref({
      name: "张三",
      order: {
        devlop: "线上",
      },
    });
    const hanldeClick = () => {
      person.value.name = "李四";
      person.value.order.devlop = "线下";
    };

    watch(person.value, (current) => {
      console.log(current, "current"); // {name: '李四'} 'current'
    });
    // 使用 watch 监听响应式数据内部的具体属性 (引用数据类型)
    watch(
      () => person.value.name,
      (current) => {
        console.log(current, "current"); //  李四 'current'
      }
    );
    watch(
      () => person.value.order.devlop,
      (current) => {
        console.log(current, "current"); // 线下 current
      }
    );
    //#endregion

    //#region  使用watch监听基于reactive创建的响应式数据
    const student = reactive({ name: "kangkang" });
    const changeReactive = () => {
      student.name = "康康";
    };
    watch(student, (current) => {
      console.log(current, "current");
    });
    //#endregion

    //#region  watch监听多条数据
    const firstname = ref("");
    const lastname = ref("");
    watch(
      [firstname, lastname],
      (current) => console.log(current), //['', '']
      // 使watch再初始化的时候执行一次
      {immediate:true}
    );
    //#endregion

    //#region

    //#endregion

    return {
      ref_text1,

      person,
      hanldeClick,

      student,
      changeReactive,

      firstname,
      lastname,
    };
  },
};
</script>