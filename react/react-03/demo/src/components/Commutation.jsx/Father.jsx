import Son from "./Son";
import { useState } from "react"
const Father = () => {
  const [msg, setMsg] = useState("看见这段话了嘛 看到回个消息")
  return (
    <div>
      <h1>Father函数组件模板</h1>
      <Son msg={msg} setMsg={setMsg} />
    </div>
  )
}
export default Father;