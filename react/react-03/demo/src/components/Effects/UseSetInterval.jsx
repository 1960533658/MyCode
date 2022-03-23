import { useEffect } from "react";

const UseSetInterval = () => {
  useEffect(() => {
    const timer = setInterval(() => {
      console.log("hello setinterval");
    }, 1000);
    return () => clearInterval(timer)
  }, [])
  return (
    <div>
      <h1>UseSetInterval函数组件模板</h1>
    </div>
  )
}
export default UseSetInterval;