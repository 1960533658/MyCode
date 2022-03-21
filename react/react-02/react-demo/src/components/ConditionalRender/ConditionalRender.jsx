import IfOne from "./IfOne";
import IfTwo from "./IfTwo";
const ConditionalRender = () => {
  let aa = true;
  function showWhichOne() {
    if (aa) {
      return <IfOne />
    } else {
      return <IfTwo />
    }
  }
  return (
    <div className="father">
      <h1>ConditionalRender函数组件模板</h1>
      {/* 条件渲染——if判断 */}
      {showWhichOne()}
      {/* 条件渲染——三元表达式 */}
      { aa? <IfOne /> : <IfTwo /> }
      {/* 条件渲染—— &&运算符 */}
      { aa && <IfTwo /> }
    </div>
  )
}
export default ConditionalRender;