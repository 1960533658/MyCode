const Events = () => {
  // 定义事件处理函数
  const onClick = () => {
    alert("这是最简单的函数定义");
  }
  // 定义传参事件处理函数
  const handleArgrument = (msg) => {
    alert(msg);
  }
  // 事件对象
  const handleEvemt = (event) => {
    console.log(event.current)
  }
  return (
    <div className="father">
      <h1>事件组件</h1>
      <button onClick={onClick}>定义最简单的事件处理函数</button>
      <br />
      <button onClick={() => handleArgrument("事件传参传递的参数")}>事件传参事件处理函数</button>
      <br />
      <button onClick={(event) => handleEvemt(event)}>事件对象</button>
    </div>
  )
}
export default Events;