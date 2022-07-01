const Daughter = (props) => {
  const exitMsg = () => {
    props.appExitMsg("女儿修改字符")
  }
  return (
    <div>
      <h1>组件通讯Daughther-{ props.msg}</h1>
      <button onClick={exitMsg}>修改字符</button>
    </div>
  )
}
export default Daughter;