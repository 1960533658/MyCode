const Son = (props) => {
  console.log(props.children);
  return (
    <div className="son">
      儿子组件
      {props.children}
    </div>
  )
}

export default Son;