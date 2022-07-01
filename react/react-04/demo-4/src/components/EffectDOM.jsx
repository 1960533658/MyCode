
import { useEffect } from "react";

const EffectDOM = () => {
  const count = 0
  /**
   * ! 关于无论在任何位置函数组件中的打印都会执行两次的情况
   * 这是由于版本更新导致的，但这不是BUG，而是react官方有意而为之。这样的表现形式可以让开发者更加明显地关注到副作用代码。
   * 这种情况是只有在开发模式下才会出现，在线上模式不会出现。
   */
  useEffect(() => {
    console.log("初始化执行");
  }, [count])
  return (
    <div>
      <h1>react-Effect函数组件模板</h1>
    </div>
  )
}
export default EffectDOM;
