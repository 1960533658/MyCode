// import {  useState } from 'react';
import './App.css';
// import Props from './components/Props';
// import EffectDOM from './components/EffectDOM';
// import Son from "./components/Son";
// import Daughther from "./components/Daughter";
function App() {
  // const [msg,setMsg] = useState("传输字符");
  // const appExitMsg = (newMsg) => {
  //   setMsg(newMsg)
  // }
  return (
      <div className="App">
        {/* <Props msg={msg}>
        <div>children复用组件传输元素1</div>
      </Props> */}
      
      
        {/* <Props>
        <div>children复用组件传输的元素2</div>
      </Props> */}
        {/* <EffectDOM /> */}
        
        {/* 组件通讯 */}
        {/* <Son msg={msg} appExitMsg={appExitMsg}></Son>
        <Daughther msg={msg} appExitMsg={appExitMsg}></Daughther> */}

        {/* context通讯 */}
      </div>
  );
}

export default App;
