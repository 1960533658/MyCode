// import { useState } from "react";


// useEffect 初始化获取数据
// import GetAjax from "./components/Effects/GetAjax";

// useEffect 当组件卸载时删除清除定时器
// import UseEffectSetInterval from "./components/Effects/UseSetInterval";

// 组件通讯——父子组件传值
// import GrandFather from "./components/Commutation.jsx/GrandFather";

// 表单控制——受控表单组件
import ControlInput from "./components/ControlInput/ControlInput";
function App() {
  
  //#region  组件通讯——父子组件传值
  // const [isShow, setIsShow] = useState(true);
  // const handleClick = () => {
  //   setIsShow(!isShow)
  //   console.log(isShow);
  // }
  //#endregion
  

  return (
    <div className="App">
      {/* useEffect 初始化获取数据 */}
      {/* <GetAjax /> */}

      {/* useEffect 组件销毁时清除定时器 */}
      {/* <button onClick={handleClick}>销毁子组件组件</button>
      {isShow && <UseEffectSetInterval />} */}

      {/* 组件通讯——父子组件传值 */}
      {/* <GrandFather /> */}

      {/* 表单控制——受控表单组件 */}
      <ControlInput />
    </div>
  );
}

export default App;
