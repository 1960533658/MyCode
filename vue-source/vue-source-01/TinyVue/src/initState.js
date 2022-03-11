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
  data.a = { x: 1, y: 2 }
  console.log(data)
} 