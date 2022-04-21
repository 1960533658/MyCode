import { useEffect, useState } from "react";
import axios from "axios"
const GetAjax = () => {
  const [count, setCount] = useState(0)
  const handleClick = () => {
    setCount(count + 1)
  }
  useEffect(() => {
    axios.get("https://cnodejs.org/api/v1/topics")
      .then(response => {
        console.log(response);
      })
  }, [])
  const handleUpdate = () => {

  }
  return (
    <div className="father">
      <h1>GetAjax函数组件模板</h1>
      <div>{count}</div>
      <button onClick={handleClick}>Effect中的代码只在初始化渲染的时候执行一次</button>
      <button onClick={handleUpdate}>aa</button>
    </div>
  )
}
export default GetAjax;