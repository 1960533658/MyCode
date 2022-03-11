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
