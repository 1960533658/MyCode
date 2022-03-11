// 判断参数是否是函数类型
/**
 * 
 * @param {any} value 传递要判断是否为function的参数
 * @returns Boolean;
 */
export function isFunction(value) {
  // console.log(value)
  return typeof value === "function";
}
/**
 * 判断数据是不是一个对象类型
 * @param {object|string|boolean|number} value 需要配判断的数据
 * @returns Boolean
 */
export function isObject(value) {
  return typeof value === "object" && value !== null; 
}