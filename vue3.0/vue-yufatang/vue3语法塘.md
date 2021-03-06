# vue3语法塘
```bath
# 升级 vue/cli 脚手架
npm i -g @vue/cli
# 查看全局库版本
npm list -g --depth 0
```
## 基本用法
```vue
<script setup>
// 此处代码将会被编译为 setup 函数代码
// 也就是说此处代码将会在组件每次创建实例时执行
// 在内部声明的顶级变量和函数都可以在模板中你直接使用
const test = "这里是vue3 语法塘";
const onClick = () => {
  console.log(test);
};
</script>
<template>
  <div @click="onClick">{{ test }}</div>
</template>
```

### 导入方法文件
`app.js`
```vue
<script setup>
// 此处代码将会被编译为 setup 函数代码
// 也就是说此处代码将会在组件每次创建实例时执行
// 在内部声明的顶级变量和函数都可以在模板中你直接使用
import { capitalize } from "./utils"; // 小写转大写方法
const str = "hello vue";
const onClickStr = () => {
  console.log(capitalize(str));
};
</script>
<template>
  <div>
    <div @click="onClickStr">{{ str }}</div>
  </div>
</template>
```

`utils/index.js`
```js
export function capitalize(str) {
  return str.toUpperCase();
}
```

### 响应式数据
```vue
<script setup>
import { ref } from "vue";

const count = ref(0);
</script>

<template>
  <div @click="count++">{{ count }}</div>
</template>
```


### 导入组件
```vue
<script setup>
// 在此处可以直接导入组件在模板中使用, 不再需要手动注册组件
import HelloWorld from "@/components/HelloWorld";
</script>

<template>
  <HelloWorld />
</template>
```


### 使用父组件传递给子组件的数据
```vue
<!-- src/App.vue -->
<script setup>
import HelloWorld from "./components/HelloWorld";
</script>

<template>
  <HelloWorld msg="Hello Vue script setup" />
</template>
```

```vue
<!-- src/components/HelloWorld.vue -->
<script setup>
// 定义该组件接收的 Props
// defineProps 在此处可以直接使用无需导入
defineProps({ msg: String });
</script>
<template>
  {{ msg }}
</template>
```


### 子组件触发父组件传递的自定义事件
```vue
<!-- src/components/HelloWorld.vue -->
<script setup>
// defineEmits 在此处可以直接使用无需导入
defineEmits(["delete"]);
</script>
<template>
  <button @click="$emit('delete')">delete button</button>
</template>
```

```vue
<!-- src/App.vue -->
<script setup>
import HelloWorld from "./components/HelloWorld";
function onDeleteHandler() {
  alert("deleted");
}
</script>

<template>
  <HelloWorld @delete="onDeleteHandler" />
</template>
```


### 子组件像外部暴露自己的数据
```vue
<!-- src/components/HelloWorld.vue -->
<script setup>
const count = 0;
// 定义当前组件向外暴露的数据
defineExpose({ count });
</script>
```

```vue
<!-- src/App.vue -->
<script setup>
import HelloWorld from "./components/HelloWorld";
import { ref } from "vue";
const instance = ref(null);
function log() {
  console.log(instance.value.count);
}
</script>

<template>
  <HelloWorld ref="instance" />
  <button @click="log">button</button>
</template>
```


### 插槽
```vue
<!-- src/components/HelloWorld.vue -->
<script setup>
import { useSlots, getCurrentInstance } from "vue";
// 获取组件实例
const currentInstance = getCurrentInstance();
// 获取插槽
const slots = useSlots();
// 通过 JSX 渲染模板
currentInstance.render = () => <div>{slots.default()}</div>;
</script>
```

```vue
<!-- src/App.vue -->
<script setup>
import AsyncComponent from "./components/02.asyncComponent.vue"
</script>

<template>
  <div>
    <!-- 由于是异步组件，模板会比数据更早渲染 使用Suspense组件可以回复script提前于模板执行 -->
    <Suspense>
      <AsyncComponent />
    </Suspense>
  </div>
</template>
```



```vue
<!-- src/components/02.asyncComponent.vue -->
<script setup>
import axios from "axios"
// 异步获取数据
let response = await (await axios.get("https://cnodejs.org/api/v1/topics")).data.data
// 数据过多减少数据到十条
response.length = 10;
</script>
<template>
  <div>
    <h1>异步组件的外部不需要使用async</h1>
    <ul>
      <!-- 遍历数据渲染模板 -->
      <li v-for="item in response" :key="item.id">{{item.title}}</li>
    </ul>
  </div>
</template>
```




## pinia
[pinia 官网](https://pinia.vuejs.org)
```bash
yarn add pinia
npm install pinia
```

```javascript
import { createPinia } from 'pinia'
// return the root store
app.use(createPinia())
```

创建 store，存储状态

```javascript
// src/stores/user.js
import { defineStore } from "pinia";

export const useUser = defineStore("user", {
  state: () => ({ username: "张三" }),
});
```

使用状态

```vue
<!-- src/App.vue -->
<script setup>
import { useUser } from "@/stores/user";
import { storeToRefs } from "pinia";

const user = useUser();
// 以下为错误写法，状态丢失响应性
// const {username, age} = useUser();

// 以下为正确写法, 保持了数据的响应性
const { username, age } = storeToRefs(user);

</script>
<template>
	<!-- 直接获取并使用不会破坏数据响应性 -->
	<p> {{ user.username }}</p>
	<p> {{ username }} </p>
</template>
```

更改状态

```javascript
// src/stores/user.js
import { defineStore } from "pinia";

export const useUser = defineStore("user", {
  state: () => ({ username: "张三", age: 20, hobbies: [] }),
  actions: {
    updateUsername(username) {
      this.username = username;
    },
  },
});

```

```vue
<!-- src/App.vue -->
<script setup>
import { useUser } from "@/stores/user";
const user = useUser();
</script>
<template>
  {{ user.username }}
  <button @click="user.updateUsername('李四')">updateUsername</button>
</template>
```

```vue
<!-- src/App.vue -->
<script setup>
import { useUser } from "@/stores/user";
const user = useUser();
</script>
<template>
  {{ user.username }} {{ user.age }}
  <button @click="user.$patch({ username: '王五' })">updateUsername</button>
  <button
    @click="
      user.$patch((state) => {
        state.hobbies.push('足球');
        state.age = 30;
      })
    "
  >
    button
  </button>
</template>
```

重置状态
重置state为初始化状态
```vue
<!-- src/App.vue -->
<script setup>
import { useUser } from "@/stores/user";
import { storeToRefs } from "pinia";
const user = useUser();
</script>
<template>
  <button @click="user.$reset">reset</button>
</template>
```

替换状态

```vue
<!-- src/App.vue -->
<script setup>
import { useUser } from "@/stores/user";
const user = useUser();
</script>
<template>
  {{ user.username }} {{ user.age }}
  <button @click="user.$state = { username: '赵六', age: 50 }">replace state</button>
</template>
```



getters，getters 就是 store 中的计算属性

```javascript
// src/stores/user.js
import { defineStore } from "pinia";

// getters 就是 store 中的计算属性
export const useUser = defineStore("user", {
  state: () => ({ count: 25 }),
  getters: {
    doubleCount(state) {
      // 通过参数 state 获取依赖状态
      return state.count * 2;
    },
    doubleCountPlusOne() {
      console.log(this);
      // 通过 this 获取其他 getter
      return this.doubleCount + 1;
    },
  },
});
```

```vue
<!-- src/App.vue -->
<script setup>
import { useUser } from "@/stores/user";
const user = useUser();
</script>
<template>{{ user.doubleCount }} {{ user.doubleCountPlusOne }}</template>
```



Getter 传递参数

```javascript
// src/stores/user.js
import { defineStore } from "pinia";

// getters 就是 store 中的计算属性
export const useUser = defineStore("user", {
  state: () => ({ count: 25 }),
  getters: {
    // getter 传递参数, 该方式会失去 getter 缓存特性
    countPlus(state) {
      return (count) => state.count + count;
    },
  },
});
```

```vue
<!-- src/App.vue -->
<script setup>
import { useUser } from "@/stores/user";
const user = useUser();
</script>
<template>
  {{ user.countPlus(5) }}
</template>
```



Action 异步获取数据

```javascript
// src/stores/user.js
import { defineStore } from "pinia";
import axios from "axios";

export const useUser = defineStore("user", {
  state: () => ({ profile: null }),
  actions: {
    async getUserInfo(id) {
      let { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      this.profile = data;
    },
  },
});
```

```vue
<!-- src/App.vue -->
<script setup>
import { useUser } from "@/stores/user";
const user = useUser();
</script>
<template>
  {{ user.profile }}
	<button @click="user.getUserInfo(1)">getUserInfo</button>
</template>
```

