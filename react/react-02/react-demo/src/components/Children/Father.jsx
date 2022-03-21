import Son from "./Son";

const Father = () => {
  return (
    <div className="father">
      <h1>组件复用——children</h1>
      <Son>
        <div>children相当于vue中的插槽</div>
      </Son>
    </div>
  )
}

export default Father;