import { isObject } from "../utils"

export function observe(data) {
  // 只有引入数据类型才需要被劫持 数组|对象 如果不是停止函数
  if (!isObject(data)) return;
  return new Observe(data);
}

class Observe {
  constructor(data) {
    this.walk(data)
  };
  walk(data) {
    Object.keys(data).forEach(key => {
      defineReactive(data, key, data[key])
    })
  }
}
// 定义拦截函数
function defineReactive(data, key, value) {
  // 循环调用数据劫持方法 拦截每一个嵌套对象
  // a: {
  //   b: {
  //     c: {}
  //   }
  // }
  observe(value)
  // 使用 definneProperty 进行数据拦截
  Object.defineProperty(data, key, {
    get() {
      console.log("获取值");
      return value;
    },
    set(newValue) {
      console.log("设置值");
      // 设置新值的时候重新监听对象
      observe(newValue)
      value = newValue;
    },
  });
}