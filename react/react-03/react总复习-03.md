# react总复习-03

## 组件开发基础

### 组件状态

#### Effect
3. Effect只初始换渲染时执行
该场景使用于组件初始换渲染时进行Ajax请求
`components/Effects/getAjax.jsx`
```jsx
import { useEffect, useState } from "react";
import axios from "axios"
const GetAjax = () => {
  const [count, setCount] = useState(0)
  const handleClick = () => {
    setCount(count + 1)
  }
  // 只在初始化渲染数据的时候获取数据
  useEffect(() => {
    axios.get("https://cnodejs.org/api/v1/topics")
      .then(response => {
        console.log(response);
      })
  // 传递空数组使Effect只执行一次
  }, [])
  return (
    <div className="father">
      <h1>GetAjax函数组件模板</h1>
      <div>{count}</div>
      <button onClick={handleClick}>Effect中的代码只在初始化渲染的时候执行一次</button>
    </div>
  )
}
export default GetAjax;
```
4. 组件卸载时执行回调
当组件初始换渲染的时候执行定时器 每秒打印一次结果
当组件卸载的时候 停止定时器
`app.jsx`
```jsx
// useEffect 初始化获取数据

import { useState } from "react";
import UseEffectSetInterval from "./components/Effects/UseSetInterval";
function App() {
  const [isShow, setIsShow] = useState(true);
  const handleClick = () => {
    setIsShow(!isShow)
    console.log(isShow);
  }
  return (
    <div className="App">
      {/* useEffect 组件销毁时清除定时器 */}
      <button onClick={handleClick}>销毁子组件组件</button>
      {isShow && <UseEffectSetInterval />}
    </div>
  );
}

export default App;
```

`components/Effects/UseSetInterval.jsx`
```js
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
```

因为定时器是挂载到window对象中的 所以组件销毁并不会自动清除定时器

#### 组件通讯

##### 父子通讯
在react中 组件与组件之间传递状态采用的是单向数据流架构 这是构建React应用必须遵循的状态数据传递规范
单向数据流指的是数据状态只能在一个方向上传递 即从父组件到子组件 状态数据不能反向传递 也不能横向传递

单向数据流意味着从父组件传递给子组件的数据不能再子组件中直接修改的 事实上props参数也是制度的不能被修改

在子组件中若想修改父组件传递下来的状态数据 父组件必须将修改状态的方法传递到子组件 子组件通过调用该方法更新父组件状态 父组件在装状态传递到子组件以触发试图更新

`components/Commutation/GrandFather`
```jsx
import Father from "./Father";

const GrandFather = () => {
  return (
    <div>
      <h1>GrandFather函数组件模板</h1>
      <Father />
    </div>
  )
}
export default GrandFather;
```

`components/Commutation/Father`
```jsx
import Son from "./Son";
import { useState } from "react"
const Father = () => {
  const [msg, setMsg] = useState("看见这段话了嘛 看到回个消息")
  return (
    <div>
      <h1>Father函数组件模板</h1>
      {/* 给子组件传递 msg 和setMsg用于修改msg */}
      <Son msg={msg} setMsg={setMsg} />
    </div>
  )
}
export default Father;
```

`components/Commutation/Father`
```jsx
const Son = (props) => {
  // 通过父组件传递的setMsg重新设置msg
  const reply = () => {
    props.setMsg("我看见了")
  }
  return (
    <div>
      <h1>Son函数组件模板</h1>
      {/* 通过props获取msg */}
      {props.msg}
      <button onClick={reply}>回复消息</button>
    </div>
  )
}
export default Son;
```



#### 兄弟通讯

在 React 中若要实现兄弟组件通讯需要借助组件状态提升思想。组件状态提升指的是将兄弟组件之间的共享状态提升到最近的公共父级组件中，由公共父级组件维护这个状态和修改状态的方法，父级组件再通过 props 的方式将状态数据传递到两个子组件中。

### 表单控制

#### 受控表单组件
在 React 组件中使用表单元素时，为了方便获取表单控件的值，通常都会将表单控件和组件状态进行绑定，通过该方式使用表单的组件叫做受控表单组件。
1. text
`components/ControlInput/ControlInput.jsx`
```jsx
import { useState } from "react";

const ControlInput = () => {
  // 定义受控组件状态
  const [username, setUsername] = useState("");
  // 当input输入改变时 使用事件对象even获取当前值让状态重新渲染
  const ControlInputHandler = (event) => {
    setUsername(event.target.value)
  }
  return (
    <div>
      <h1>ControlInput受控表单函数组件模板</h1>
      <input
        type="text"
        value={username}
        onChange={(event) => ControlInputHandler(event)}
      />
    </div>
  )
}
export default ControlInput;
```

2. password
`components/ControlInput/ControlInput.jsx`
```jsx
import { useState } from "react";

const ControlInput = () => {
  // 账号&密码
  const [formState, setForState] = useState({
    username: "",
    password: "",
  });
  const handleFormChange = event => {
    setForState({
      ...formState,
      [event.target.name]: event.target.value
    })
  }
  return (
    <div>
      <h1>ControlInput受控表单函数组件模板</h1>
      <input
        type="text"
        name="username"
        value={formState.username}
        onChange={event => handleFormChange(event)}
      />
      <input
        type="password"
        name="password"
        value={formState.password}
        onChange={event => handleFormChange(event)}
      />
    </div>
  )
}
export default ControlInput;
```






