const Son = (props) => {
  console.log(props.msg);
  return (
    <div className="son">{ props.msg }</div>
  )
}

export default Son;