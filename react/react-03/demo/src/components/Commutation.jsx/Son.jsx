const Son = (props) => {
  const reply = () => {
    props.setMsg("我看见了")
  }
  return (
    <div>
      <h1>Son函数组件模板</h1>
      {props.msg}
      <button onClick={reply}>回复消息</button>
    </div>
  )
}
export default Son;