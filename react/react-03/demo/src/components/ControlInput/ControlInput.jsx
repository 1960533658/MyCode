import { useState } from "react";

const ControlInput = () => {
  const [username, setUsername] = useState("");
  const ControlInputHandler = (event) => {
    setUsername(event.target.value)
  }
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
      <h2>input</h2>
      {/* text */}
      <input
        type="text"
        value={username}
        onChange={(event) => ControlInputHandler(event)}
      />
      <br />
      {/* 账号和密码 */}
      账号：<input
        type="text"
        name="username"
        value={formState.username}
        onChange={event => handleFormChange(event)}
      />
      密码：<input
        type="password"
        name="password"
        value={formState.password}
        onChange={event => handleFormChange(event)}
      />
    </div>
  )
}
export default ControlInput;