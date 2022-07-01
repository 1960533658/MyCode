import { useState } from "react";

const Props = (props) => {

  const [num, setNum] = useState(1)
  const numAdd = (e, arg) => {
    setNum(num + 1);
    console.log(e, arg);
  }
  console.log('props :>> ', props.children);
  const arr = [1, 2, 3];
  return (
    <div>
      <h1>react函数组件模板</h1>
      <button onClick={(event) => numAdd(event, 1)}>+1</button>
      {num}
      <br />
      msg:{props.msg}
      {props.children}
      <br />
      {/* 列表渲染 */}
      <ul>
        {arr.map((item, index) => {
          return <li key={index}>{item}</li>
        })}
      </ul>
      <ul>
        {
          arr
            .filter(item => item === 1)
            .map((item, index) => {
              return <li key={index}>{item}</li>
            })
        }
      </ul>
    </div>
  )
}
Props.defaultProps = {
  msg: "默认字符"
}
export default Props;