import React from "react"
// props
// import Father from "./components/Props/Father";

// children
// import Father from "./components/Children/Father";

// 事件处理函数 绑定事件
// import Events from "./components/Event/Events";

// 条件渲染
// import ConditionalRender from "./components/ConditionalRender/ConditionalRender";

// 列表渲染
// import ListRender from "./components/ListRender/ListRender";
// useState
// import FuncUseState from "./components/FuncUseState/FuncUseState";

// useEffect
import FuncUseEffect from "./components/FuncUseEffect/FuncUseEffect";

function App() {
  return (
    <React.Fragment>
      {/* 组件复用——props */}
      {/* <Father></Father> */}

      {/* 组件复用——children */}
      {/* <Father></Father> */}
      
      {/* 组件模板——事件处理函数 */}
      {/* <Events></Events> */}

      {/* 条件渲染 */}
      {/* <ConditionalRender /> */}

      {/* 列表渲染 */}
      {/* <ListRender /> */}

      {/* useState */}
      {/* <FuncUseState /> */}

      {/* useEffect */}
      <FuncUseEffect />
    </React.Fragment>
  );
}

export default App;
