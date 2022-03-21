# react总复习
## react 急速入门
### React 概述

#### React 是什么

> A JavaScript library for building user interfaces
>
> 一个用于构建用户界面的 JavaScript 库

React 是一个开源的 JavaScript 库，用于构建 web 应用中的视图层，实际上就是 web 应用中的前端用户界面。

<img src="./assets/images/01.png" align="left" width="70%"/>

使用 React 构建的客户端 web 应用可以快速响应用户操作，使 web 应用的使用体验近乎于移动 App。

<video>
	 <source src="./assets/video/01.mp4" type="video/mp4">
</video>


React 允许开发人员将用户界面代码和逻辑代码进行完美融合，以更加灵活的方式创建用户界面。

```react
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

了解：React 除了可以构建运行在浏览器中的 web 应用以外，还可以构建在移动端运行的原生 App 应用。

#### 它的背景与生态

它是由 Facebook 的软件工程师在 2012 年创建，于 2013 年 5 月开源，目前由 Facebook 以及个人开发人员和公司组成的社区维护。

React 生态圈异常活跃，在构建客户端 web 应用的过程中你遇到的问题几乎都可以在社区中找到答案。

| [Redux](https://redux.js.org/)           | [MobX](https://mobx.js.org/README.html)             | [Recoil](https://recoiljs.org/)                          | [Formik](https://formik.org/)       | [React Table](https://react-table.tanstack.com/) |
| ---------------------------------------- | --------------------------------------------------- | -------------------------------------------------------- | ----------------------------------- | ------------------------------------------------ |
| [Next.js](https://nextjs.org/)           | [Gatsby](https://www.gatsbyjs.com/)                 | [React Query](https://react-query.tanstack.com/)         | [SWR](https://swr.vercel.app/zh-CN) | [React Router](https://reactrouter.com/)         |
| [React Spring](https://react-spring.io/) | [Styled-Components](https://styled-components.com/) | [Ant Design](https://ant.design/docs/react/introduce-cn) | [Material UI](https://mui.com/zh/)  | [MSW](https://mswjs.io/)                         |

[官方文档](https://reactjs.org/)

### react 初体验
react：核心库，包含了构建 web 应用和构建移动端应用的通用方法。

react-dom：只包含了构建 web 应用的方法。

react-native-web：只包含构建移动端应用的方法。

#### createElement
引入 `react` 后，window 对象下会多出一个 `React` 的对象，对象下面的 `createElement` 方法用于创建元素。

```jsx
// type: 标签名称, 字符串.
// props: 元素属性, 对象, 无属性填入 null
// children: 子元素, 普通文本或 createElement 方法返回的元素对象
// 返回值: 元素对象 (虚拟 DOM 对象) 
React.createElement(type, props, children)
```

```javascript
const button = React.createElement("button", { type: "button" }, "保存")
```

#### render
引入 `react-dom` 后，window 下会多出一个叫做 `ReactDOM` 的对象，对象下面的 `render` 方法用于渲染元素。

```jsx
// element: 待渲染元素对象, 就是通过 createElement 方法创建的虚拟 DOM 对象
// container: 虚拟 DOM 对象的渲染位置. 真实 DOM 对象.
ReactDOM.render(element, container)
```

```html
<div id="root"></div>
```

```jsx
ReactDOM.render(button, document.getElementById("root"))
```

#### 练习
> 将指定的DOM结构使用React提供的 `createElement` 和 `render` 渲染出来

```html
<main id="main">
  <h1>My Blog</h1>
  <article>
    <h2>My first blog post</h2>
    <p class="text">This is the content of my post</p>
  </article>
</main>
```

```html
<script>
  // 创建h1标签 填写内容
  const title = React.createElement("h1", null, "my Blog");
  // 创建h2标签 填写内容
  const SubTitle = React.createElement("h2", null, "my first blog post");
  // 创建p标签 创建类名 填写内容
  const paragraph = React.createElement(
    "p",
    {className: "text"},
    "This is the content of my post"
  );
  // 创建artcle标签 创建类名 将 h2&p 标签 添加为子标签
  const artcle = React.createElement("article", null, SubTitle, paragraph);
  // 创建main标签 创建类名 将 h1&artcle 标签 添加为子标签
  const main = React.createElement("main", {id: "main"}, title, artcle);
  // 将main标签添加至 id 为 root 的标签中
  ReactDOM.render(main, document.getElementById("root"))
</script>
```

### 初识 JSX 语法

#### 已知问题

由于 React 内部的优化机制所致, 它必须使用 `createElement` 方法构建用户界面, 但对于开发者来说该方法又确实增加了编写代码的复杂度。

为了解决以上问题, React 为 `createElement` 方法创造了替代语法，这种语法和传统的 HTML 语法相似度极高, 这样开发者就可以使用熟悉的语法构建界面了。在应用构建阶段, 再使用 `balbel` 将这种替代语法转换为 `createElement` 方法, 这样 React 又可以使用它创建元素了。

```jsx
const button = <button type="button">button</button>
```

```javascript
React.createElement('button', {type: "button"}, "button")
```

#### JSX是什么
JSX 是 JavaScript编程语言的扩展语法补充，是由Facebook创建的，用于在React中创建用户界面
但是这种语法浏览器是不识别的，所以我们需要借助 Babel 对其进行转换，将其转换为 React.createElement 方法的调用， 所以说 JSX 的本质就是 JavaScript
[Babel REPL](https://babeljs.io/repl)

#### 语法规则
1. 语法规则
在使用 JSX 语法创建元素时，元素的最外层必须要有一个根标记
```jsx
// 错误语法
const jsx = (
  <p>Hello</p>
  <p>world</p>
)
// 正确语法
const jsx = (
  <div>
    <p>Hello</p>
    <p>world</p>
  </div>
)
// 占位标识符 再选然后不会产生真实的DOM对象
<React.Fragment></React.Fragment>
<></>
```

2. 单标记自闭和
```jsx
<input type="text" />
<img src="XXX"/>
```

3. 属性命名规则
属性名称遵循驼峰式命名法（小托分）
```jsx
// HTML写法
<input type="text" maxlength="10" readonly autofoucs />
// JSX写法
<input type="text" maxLength="10" readOnly autofoucs />
```

4. className属性
```jsx
// HTML写法
<input type="text" class="input" />
// JSX写法
<input type="text" className="input" />
```

5. htmlFor属性
label标记使用 htmlFor，因为fir在 JavaScript 中是保留关键字
```jsx
// HTML写法
<label for="demo" /></label>
// JSX写法
<input htmlFor="demo" /></label>
```

6. 注释
JSX 中的注释写法为 `{/**/}`
```jsx
// HTML写法
<label for="demo" /></label>
// JSX写法
<input htmlFor="demo" /></label>
```

7. 插值语法
label标记使用 htmlFor，因为fir在 JavaScript 中是保留关键字
```jsx

const fun = () => {
  const num1 = 123;
  const num2 = 123;
  const obj = {name: "kangkang"}
  return (
    {/* 直接插入数据 */}
    <div>{num1}</div>
    <div>{obj.name}</div>
    {/* 执行计算 */}
    <div>{num1 + num2}</div>

  )
}
```

#### create-react-app
`create-react-app` 是React官方提供的用于创建React应用的脚手架工具
```bash
npm install create-react-app -g
npm init react-app react-demo
create-react-app [项目名称]
```

## 组件化开发基础

### 组件概述

#### 什么是组件
React 中的组件就是页面中的一小块区域 组件内部会包含这块区域中的视图代码、样式代码一级逻辑代码
React 采用组件化开发的方式构建用户界面

#### 组件的设计思想
组件的核心思想之一就是复用 定义一次 使用多次，多出使用。组件用来封装用户界面中的重复区块 复用重复区块
组件的另一个核心思想是解耦 默认情况下每个组件都有自己的作用域 内部代码在外部不可见 这意味着组件之间的代码不会发生冲突 从而避免在传统开发模式中经常的改A坏B的问题

#### 如何创建组件
在react中 组件以函数的形式存在 组件最基本的特征就是一个返回视图（JSX）的函数
```jsx
function Paragraph() {
  return (<div>这是组件</div>)
}
```
在 React 中，组件以自定义标签的形式进行调用。

```jsx
ReactDOM.render(<Paragraph />, document.getElementById("root"))
```
### 复用组件
```jsx
const jsx = (
  <>
    <Paragraph />
    <Paragraph />
  </>
)
ReactDOM.render(jsx, document.getElementById("root"))
```

组件和 HTML 一样，都是以树状结构存在的。

#### props
在调用组件的时候可以通过标签添加属性的方式向组件内部传递数据 实现差异化组件的复用
`components/Props/Father.jsx`
```jsx
import Son from "./Son";
const Father = () => {
  return (
    <div className="father">
      <h1>组件复用——children</h1>
      <Son msg="我亲爱的儿子"></Son>
    </div>
  )
}

export default Father;
```

`components/Props/Father.jsx`
```jsx
const Son = (props) => {
  console.log(props.msg);
  return (
    <div className="son">{ props.msg }</div>
  )
}

export default Son;
```

props默认值
`components/Props/Father.jsx`
```jsx
import Person from './Person';
const Father = () => {
  return (
    <div className="father">
      <h1>组件复用——children</h1>
      {/* 调用Person组件 使用props默认值 */}
      <Person msg="kangkang"></Person>
      <Person></Person>
    </div>
  )
}

export default Father;
```

`components/Props/Person.jsx`
```jsx
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
```

默认值可以防止组件内部报错

#### children
`components/Children/Father.jsx`
```jsx
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
```
`components/Children/Son.jsx`
```jsx
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
```

### 组件模板

#### 事件（传参、事件对象）
事件名称采用小驼峰命名法的方式进行命名 事件处理函数通过插值的方式指定
`components/Event/Events.jsx`
```jsx
const Events = () => {
  const onClick = () => {
    alert("这是最简单的函数定义");
  }
  return (
    <div className="father">
      <h1>事件组件</h1>
      <button onClick={onClick}>定义最简单的事件处理函数</button>
    </div>
  )
}
export default Events;
```

事件传参
`components/Event/Events.jsx`
```jsx
const Events = () => {
  // 定义传参事件处理函数
  const handleArgrument = (msg) => {
    alert(msg);
  }
  return (
    <div className="father">
      <h1>事件组件</h1>
      <button onClick={() => handleArgrument("事件传参传递的参数")}>事件传参事件处理函数</button>
    </div>
  )
}
export default Events;
```

事件对象
`components/Event/Events.jsx`

```jsx
const Events = () => {
  
  // 事件对象
  const handleEvemt = (event) => {
    console.log(event.current)
  }
  return (
    <div className="father">
      <h1>事件组件</h1>
      <button onClick={(event) => handleEvemt(event)}>事件对象</button>
    </div>
  )
}
export default Events;
```

#### 条件渲染
1. **if条件判断渲染**
react 中不能使用插值的方式进行for循环和if判断 只能进行表达式和map列表渲染
`components/ComditionalRender/ComditionalRender.vue`
```jsx
import IfOne from "./IfOne";
import IfTwo from "./IfTwo";

const ConditionalRender = () => {
  function showWhichOne() {
    if (true) {
      return <IfOne />
    } else {
      return <IfTwo />
    }
  }
  return (
    <div className="father">
      <h1>ConditionalRender函数组件模板</h1>
      {showWhichOne()}
    </div>
  )
}
export default ConditionalRender;
```

`components/ComditionalRender/IfOne.vue`
```jsx
const IfOne = () => {
  return (
    <div className="father">
      <h1>IfOne模板</h1>
    </div>
  )
}
export default IfOne;
```
`components/ComditionalRender/IfTwo.vue`
```jsx
const IfTwo = () => {
  return (
    <div className="father">
      <h1>IfTwo模板</h1>
    </div>
  )
}
export default IfTwo;
```

2. 三元表达式
`components/ComditionalRender/ComditionalRender.vue`
```jsx
  {/* 条件渲染——三元表达式 */}
  { aa? <IfOne /> : <IfTwo /> }
```

3. && 运算符
```jsx
{/* 条件渲染—— &&运算符 */}
{ aa && <IfTwo /> }
```

#### 列表渲染
1. 数组自动展开
将数组直接写在表达式中会直接将内部元素渲染出来，即\[1,2,3\] ==> 123
`components/ListRender/ListRender.vue`
```jsx
const ListRender = () => {
  const arr = [1, 2, 3];
  return (
    <div className="father">
      <h1>列表渲染</h1>
      <h2>数组自动展开</h2>
      <ul>{ arr }</ul>
    </div>
  )
}
export default ListRender;
```
注意！当数组内为对象的时候我们不能再展开数组 因为react不知道如何渲染对象

2. 列表渲染
`components/ListRender/ListRender.vue`
```jsx
const ListRender = () => {
  const arr = [1, 2, 3];
  return (
    <div className="father">
      <h1>列表渲染</h1>
      <h2>列表渲染--map</h2>
      <ul>
        {
          arr.map((item, index) => {
            return <li key={index}>{ item }</li>
          })
        }
      </ul>
    </div>
  )
}
export default ListRender;
```

3. 列表过滤（filter）
`components/ListRender/ListRender.vue`
```jsx
const ListRender = () => {
  const arr = [1, 2, 3];
  return (
    <div className="father">
      <h1>列表渲染</h1>
      <h2>数组自动展开</h2>
      <div>{arr}</div>
      <h2>列表渲染--map</h2>
      <ul>
        {
          arr.map((item, index) => {
            return <li key={index}>{ item }</li>
          })
        }
      </ul>
      <h2>列表渲染--filter</h2>
      <ul>
        {
          arr
            .filter(item => item === 2)
            .map((item, index) => {
            return <li key={index}>{item}</li>
          })
        }
      </ul>
    </div>
  )
}
export default ListRender;
```

### 组件状态
在现实世界中，状态通常是指人或事物表现出来的形态。

由于组件执行的最终结果就是用户界面，所以组件状态指的就是用户界面的状态。

React 遵循数据驱动 DOM 的理念，数据的变化会引起视图的自动更新。

这里所说的数据其实就是组件状态数据，组件状态数据其实就是组件内部维护的能够驱动视图更新的数据。

React 将组件看成是状态机，用户与绑定了组件状态数据的视图进行交互，从而产生新的状态，React 再使用新的状态数据渲染新的视图状态。

#### 钩子函数概述

React 使用函数作为组件 但是函数自身有重大的限制 就是不能持续保存状态 因为函数在执行完成以后内部的局部变量就被释放了。

但是最为组件 它必须具备保存状态的功能 因为只有状态被保存了 我们才可以基于现有状态计算新状态，使用新的状态更新视图

为了对函数组件功能进行增强，React提供了钩子函数，你想要在函数组件内部使用什么功能 就使用钩子函数将该功能`钩`进函数组件内部

所有的钩子函数都是为了函数引入外部功能，所以React约定 钩子一律使用`use`前缀命名 便于识别

#### useState

`React.useState` 方法用于声明组件状态数据，通过该方法声明的状态数据被更改后会触发视图更新。

`components/FuncUseState/FuncUseState.jsx`
```jsx
import { useState } from "react";

const FuncUseState = () => {
  // 初始化渲染的值只有组件第一次被渲染的时候才会使用 之后的更新渲染就会被react忽略
  // 返回值是一个数组 从数组中结构的第一个值是 状态变量 第二个值是更改状态的回调函数
  const [conditionalRender, setconditionalRender] = useState("我是useState的初始化渲染")
  // useState方法可以被多次调用声明状态函数
  const [num, setNum] = useState(0)
  const handlerClick = () => {
    setNum(num + 1)
  }
  return (
    <div className="father">
      <h1>FuncUseState函数组件模板</h1>
      <div>{ conditionalRender }</div>
      <strong>{ num }</strong>
      <br />
      <button onClick={handlerClick}>点击更新state</button>
    </div>
  )
}
export default FuncUseState;
```
组件状态数据发生变化后会触发视图更新，视图更新意味着组件函数被重新执行，虽然组件函数重新执行了，但是状态变量并没有被释放，组件状态在每次组件函数重新执行后被保留了下来。

组件中的普通变量就不具备此功能，普通变量被更改后不会触发视图更新，而且当真正的组件状态变化后组件函数重新执行，普通变量也被重置为初始值。

#### useEffent
1. 副作用概述

组件的职责就围绕 props 和 state 计算用户界面所需要的状态数据，其他的和渲染用户界面逻辑没有关系的操作都属于副作用。

比如 Ajax Request、手动修改 DOM、localStorage、console.log、setInterval 等。

副作用本身不是错误代码，但是如果副作用代码在组件中放置的不是最佳位置，可能导致组件的性能变差。

2. useEffect 方法
如果不适用useEfffect 包裹DOM操作和console.log 就会导致每次useState更新状态就重新执行一次 这就是副作用代码 我们应该避免不必要的代码执行
`components/FuncUseEffect/FuncUseEffect.jsx`
```jsx
import { useEffect, useState } from "react";

const FuncUseEffect = () => {
  const [count, setCount] = useState(0)
  const [num, setNum] = useState(0)
  const handleCountClick = () => {
    setCount(count + 1);
  }
  const handleNumClick = () => {
    setNum(num + 1);
  }
  useEffect(() => {
    document.title = count
    console.log("同步网页标题成功");
  }, [count])
  return (
    <div className="father">
      <h1>FuncUseEffect函数组件模板</h1>
      <p>{count}</p>
      <button onClick={handleCountClick}>count+</button>
      <button onClick={handleNumClick}>num+</button>
    </div>
  )
}
export default FuncUseEffect;
```