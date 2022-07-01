const Son = (props) => {
  const exitMsg = () => {
    props.appExitMsg("儿子修改字符")
  }
  return (
    <div>
      <h1>组件通讯Son-{props.msg}</h1>
      <button onClick={exitMsg}>修改字符</button>
    </div>
  )
}
export default Son;