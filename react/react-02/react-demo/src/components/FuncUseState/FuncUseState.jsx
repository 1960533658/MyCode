import { useState } from "react";

const FuncUseState = () => {
  const [conditionalRender, setconditionalRender] = useState("我是useState的初始化渲染")
  const [num, setNum] = useState(0)
  const handlerClick = () => {
    setNum(num + 1)
  }
  return (
    <div className="father">
      <h1>FuncUseState函数组件模板</h1>
      <div>{ conditionalRender }</div>
      <strong>{ num }</strong>
      <br />
      <button onClick={handlerClick}>点击更新state</button>
    </div>
  )
}
export default FuncUseState;