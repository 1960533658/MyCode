import { useEffect, useState } from "react";

const FuncUseEffect = () => {
  const [count, setCount] = useState(0)
  const [num, setNum] = useState(0)
  const handleCountClick = () => {
    setCount(count + 1);
  }
  const handleNumClick = () => {
    setNum(num + 1);
  }
  useEffect(() => {
    document.title = count
    console.log("同步网页标题成功");
  }, [count])
  return (
    <div className="father">
      <h1>FuncUseEffect函数组件模板</h1>
      <p>{count}</p>
      <button onClick={handleCountClick}>count+</button>
      <button onClick={handleNumClick}>num+</button>
    </div>
  )
}
export default FuncUseEffect;