const Person = (props) => {
  return (
    <div className="father">
      <h1>{props.msg}</h1>
    </div>
  )
}
// 设置props默认值
Person.defaultProps = {
  msg: "kangkang你好"
}
export default Person;