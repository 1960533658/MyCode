import Son from "./Son";
import Person from './Person';
const Father = () => {
  return (
    <div className="father">
      <h1>组件复用——children</h1>
      {/* 复用组件 差异化传值 */}
      <Son msg="我亲爱的儿子"></Son>
      <Son msg="我是爱你的爸爸"></Son>
      {/* 调用Person组件 使用props默认值 */}
      <Person msg="kangkang"></Person>
      <Person></Person>
    </div>
  )
}

export default Father;