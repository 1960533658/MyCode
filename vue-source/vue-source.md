# vue-source

## 1.Rollup 概述

### 概述
虽然在最新的 JavaScript 语言中已经支持了模块语法， 但是在过去JavaScript并没有将此功能在作为语言的核心，导致目前主流的浏览器并不能很好的支持模块语法 所以模块打包器应运而生
Rollup就是一个JavaScript模块打包器， 能够实现开发时使用模块构建时剥离模块或进行模块规范的转换
webpack 主要为工程化项目进行打包 Rollup更专注于打包库文件

### 环境初始化
1. 创建tinyVue目录，执行npm init 命令创建项目工程文件package.json
2. 创建src目录，用作源码目录，常见index.js用作入口文件
```js
function TinyVue() {
  console.log("TinyVue");
}

export default TinyVue;
```

3. 安装项目依赖
```bush
npm install --save-dev rollup @babel/core @babel/preset-env rollup-plugin-babel rollup-plugin-local-resolve
```

rollup: 模块打包工具
@babel/core: babel核心模块
@babel/preset-env: 转换高级JavaScript语法
rollup-plugin-babel: rollup插件，用来在rollup中调用babel
rollup-plugin-local-resolve: rollup插件，用来进行模解析，导入模块时可自动解析模板文件中的index.js
例: 将路径 ./file 解析成 ./file/index.js

4. 创建 `Rollup` 配置文件 在应用根目录下新建 `rollup.config.js` 文件
```js
import babel from "rollup-plugin-babel";
import localResolver from "rollup-plugin-local-resolve";
export default {
  // 打包文件的入口文件（打包文件的位置）
  input: "src/index.js",
  // 打包出口设置
  output: {
    // 打包文件的存储路径及文件名称
    file: "dist/TinyVue.js",
    // 指定导报之后的代码使用什么类型的模块规范
    // umd 通用模块规范 该规范可以在浏览器环境（AMD、无模块）中使用 也可以在node环境（CommonJS）中使用
    format: "umd",
    /**
     * 在浏览器中使用 umd 模块规范时 打包结果会被放置在一个对象中 该对象会被挂载到 window 下面
     * name 选项指定的是对象名称（默认导出的对象名称TinyVue）
     * window.TinyVue
     */
    name: "TinyVue",
    // 执行源码和打包代码之间的映射关系
    // 在浏览器中运行的是打包之后的代码，如果代码报错 默认报的也是打包之后代码中报错的位置
    // 我们需要知道源代码中报错的位置
    sourcemap: true,
  },
  plugins: [
    // 使用 babel 将高级 JavaScript 语法转换成 ECMAScript5
    babel({
      // 转换高级 JavaScript 语法
      presets: ["@babel/preset-env"],
      // 不转换 node_modules 文件中的代码
      exclude: "node_modules/**",
    }),
    // 将路径 ./files 解析成 ./files/index.js
    localResolver(),
  ],
};
```

5. 创建应用运行脚本 打开 `package.json` 文件，并添加以下内容
```js
"scripts": {
  "dev": "rollup -c -w"
},
```

6. 测试TinyVue环境是否初始化完成
  1. 执行 `npm run dev` 命令测试打包是否成功
  2. 临时在 `test` 目录创建 `index.html` 文件引入结果文件，测试代码是否可以运行
  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <script src="../dist/TinyVue.js"></script>
    <script>
      window.TinyVue();
    </script>
  </body>
  </html>
  ```

7. 打包结果分析 `dist/tinyVue.js`
```js
;(function (global, factory) {
  // 检测当前代码是否运行在支持 CommonJS 模块规范的代码运行环境中
  typeof exports === "object" && typeof module !== "undefined"
  	// 使用 CommonJS 模块规范的语法进行导出
    ? (module.exports = factory())
  	// 检测当前代码是否运行在支持 AMD 模块规范的代码运行环境中
    : typeof define === "function" && define.amd
  	// 使用 AMD 模块规范的语法进行导出
    ? define(factory)
  	// 无模块环境, 将源码中的模块导出内容添加到全局对象中
  	// 获取全局对象, 兼容浏览器环境和 Node.js 环境
    : ((global =
        typeof globalThis !== "undefined" ? globalThis : global || self),
       // 在全局对象下添加 Vue 对象
      (global.TinyVue = factory()))
	// 因为我们在配置文件中指定的是 umd 模块规范, 所以打包文件中才会对那三种模块规范进行处理
  // 以上代码对 AMD 模块规范、CommonJS 模块规则、和浏览器中的无模块规范三种情况进行了支持
  // 以上代码将来运行在什么环境下, 就使用对应的模块规范进行模块的导入与导出
})(this, function () {
  "use strict"
	// 我们在入口文件中编写的代码或被包裹在此函数中
  // 此函数的返回值就是入口文件中默认导出的内容
  function TinyVue() {}
  return TinyVue;
})

// 以上代码为函数自执行，在调用函数时传递了两个参数, 一个是 this, 一个是函数.
// 实参 this 对应的是形参 global, 表示全局对象
// 实参函数对应的是形参 factory, 通过调用 factory 函数可以获取入口文件中的默认导出代码
// 在当前代码中将 TinyVue 函数进行了默认导出, 结果就是 window.TinyVue = TinyVue

// 全局对象说明: 以前从不同的 JavaScript 代码运行环境中获取全局对象需要使用不同的语句，在浏览器环境中，通过 this、window、self 都可以获取到全局对象，在 node.js 环境中, 通过 global 获取全局对象。
// globalThis 提供了一种标准化的获取全局对象的方式，无论在浏览器环境中还是在 node.js 环境中都可以使用 globalThis 获取全局对象

//# sourceMappingURL=TinyVue.js.map
```
## 响应式原理（数据劫持）

### 目标与概述
> 目标：通过数据劫持实现监听数据变化，为后续更新视图做准备

什么是数据劫持？

数据劫持就是监听对数据的操作，获取数据我要知道，修改数据我要知道。

为什么要实现数据劫持？

Vue 提供了数据响应式功能，数据更新后视图会自动更新，所以只有监听到了数据的变化, 才知道什么时候更新视图。
`index.html`
```html
<body>
  <div id="app">{{msg}}</div>
  <script src="../dist/TinyVue.js"></script>
  <script>
    const vm = new TinyVue({
      el: "#app",
      data: {
        msg: "Hello TinyVue "
      }
    });
  </script>
</body>
```

### 初始化
开发者在实例化 TinyVue 的时候，首先做的是功能上的初始化，数据劫持只是初始化的一个环节，所以我们要先编写功能初始化的代码

`src/index.js`
```js
// 导入初始化 Vue 功能的方法
import { initMixin } from "./init";
// 创建 Vue 构造函数, Vue 中的功能都要追加到该构造函数的原型对象中 
function TinyVue(options) {
  // 调用原型中的初始化 Vue 功能的方法
  this._init(options);
}

// 如果将所有原型方法都写入当前文件, 当前文件将会变得不易维护
// TinyVue.prototype.func = function () {}
// TinyVue.prototype.func = function () {}
// ...

// 混入初始化逻辑
initMixin(TinyVue);
// 默认导出 Vue 构造函数, 打包完成后, 它会被放置在 window 对象中
export default TinyVue;
```

`src/init.js`
```js
// 该方法用于接收 Vue 构造函数
// 我们可以在该方法中通过构造函数向原型对象中添加方法以扩展功能
export function initMixin(TinyVue) {
  Vue.prototype._init = function (options) {
    console.log(options);
  };
}
```

### 挂在options
> 目标:将options参数挂载到TinyVue实例对象中，方便原型对象中的其他方法获取options参数
将来在 TinyVue 原型对象中会有很多扩展方法，这些方法都需要获取 options 参数，如果在调用每个方法时都传递 options 参数 代码会变得混乱。
所以在实现其他功能之前，要将options参数挂载 TinyVue实例对象中，方便其他原型方法获取。
在 Vue 的原型方法中 this表示的是实例对象 而每一个原型方法中都存在该this，这个每个原型对象就可以通过this获取options参数了
`src/init.js` 
```js
export function initMixin(TinyVue) {
  TinyVue.prototype._init = function (options) {
    // options 是调用 Vue 构造函数时传递的参数
    // this 是 Vue 实例对象
    // 将 options 参数挂载到 Vue 实例对象中
    this.$options = options;
  };
}
```

### 初始化流程
初始化数据
1. 当options挂载到实例中后 需要初始化数据用于进行数据拦截
2. 将initState函数导入并传递this（vm）实例
3. 判断options是否已经存在，存在调用初始化函数 initData()
4. 判断data是否为函数类型 如果是函数类型就执行返回数据 如果是对象直接使用
`src/initState.js`
```js
import { isFunction } from "./utils";

export function initState(vm) {
  // 获取开发者选项（实例）
  const options = vm.$options;
  // 判断 开发者选项是否存在
  if (options.data) {
    // 初始化data
    initDate(vm)
  }
};

function initDate(vm) {
  // 获取data 选项的值
  let data = vm.$options.data;
  // 因为data 可能是 对象 也可以是 函数，当为函数时需要的判断是否为函数，取其返回值
  // data  函数在调用时，内部的this要使用使用call指向vm实例 ，否则将会指向全局对象
  data = isFunction(data) ? data.call(vm) : data; // 修改this指向为vm
} 
```

`src/utils/index.js`
```js
// 判断参数是否是函数类型
/**
 * @param {any} value 传递要判断是否为function的参数
 * @returns Boolean;
 */
export function isFunction(value) {
  // console.log(value)
  return typeof value === "function";
}
```

`src/init.js`
```js
import { initState } from "./initState";

export function initMixin(TinyVue) {
  // 给TinyVue构造函数 prototype （原型） 添加 _init数据初始化方法
  TinyVue.prototype._init = function (options) {
    // 将开发者传递的配置选项挂载到VM实例中，方便其他扩展方法获取开发者选项
    this.$options = options;
    // 数据初始化
    initState(this)
    // 进入挂载阶段
    if (options.el) {
      console.log("进入到挂载阶段")
    }
  };
}
```

### 对象属性拦截
`src/initState`
```js
import { observe } from "./observe";
import { isFunction } from "./utils";

export function initState(vm) {
  // 获取开发者选项（实例）
  const options = vm.$options;
  // 判断 开发者选项是否存在
  if (options.data) {
    // 初始化data
    initDate(vm)
  }
};

function initDate(vm) {
  // 获取data 选项的值
  let data = vm.$options.data;
  // 因为data 可能是 对象 也可以是 函数，当为函数时需要的判断是否为函数，取其返回值
  // data  函数在调用时，内部的this要使用使用call指向vm实例 ，否则将会指向全局对象
  data = isFunction(data) ? data.call(vm) : data; // 修改this指向为vm

  // 进入数据劫持阶段
  observe(data);
} 
```
`src/utils/index.js`
```js
// 判断参数 value 的数据类型是否是函数
export function isFunction(value) {
  return typeof value === "function";
}
```

`src/observe/index.js`
```js
import { isObject } from "../utils"

export function observe(data) {
  // 只有引入数据类型才需要被劫持 数组|对象 如果不是对象 停止函数
  if (!isObject(data)) return;
  return new Observe(data);
}

class Observe {
  // 通过构造函数接收 data 选项
  constructor(data) {
    // 执行 walk 方法, 开始进行数据劫持
    this.walk(data)
  };
  walk(data) {
    // 遍历 data 选项中的所有数据
    Object.keys(data).forEach(key => {
      // 为每一个数据添加 getter 和 setter
      defineReactive(data, key, data[key])
    })
  }
}
// 定义拦截函数  数据劫持
function defineReactive(data, key, value) {
  // 循环调用数据劫持方法 拦截每一个嵌套对象
  // a: {
  //   b: {
  //     c: {}
  //   }
  // }
  observe(value)
  // 通过递归为深层次结构的数据添加 getter 和 setter
  // Vue2 中的性能问题就在于此
  Object.defineProperty(data, key, {
    get() {
      console.log("获取值");
      return value;
    },
    set(newValue) {
      console.log("设置值");
      // 设置新值的时候重新监听对象
      observe(newValue)
      // 重新赋值
      value = newValue;
    },
  });
}
```

`src/utils/index.js`
```js
/**
 * 判断数据是不是一个对象类型
 * @param {object|string|boolean|number} value 需要配判断的数据
 * @returns Boolean
 */
export function isObject(value) {
  return typeof value === "object" && value !== null; 
}
```
