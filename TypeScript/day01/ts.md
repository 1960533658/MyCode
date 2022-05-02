# TS-01

## TypeScript概述

### 1.TS是什么

- TypeScript 是一门基于 JavaScript 的编程语言，它是具有类型系统的 JavaScript。
  - 所有的 JavaScript 代码都是合法的 TypeScript 代码。
  - TypeScript 是强类型的，变量、参数、返回值等都必须有固定的类型。

- TypeScript 不能在浏览器环境或者 Node 环境直接运行，它在执行前需要先被转换为 JavaScript。

  - TypeScript 提供的类型系统只在开发阶段发挥作用，因为只有在开发阶段开发者才需要借助它进行类型上的约束。

- TypeScript 由微软发布，第一个正式版的发布时间为是2013年6月19日

### 2.什么是类型

类型是人类的思考方式，当事物确定了类型以后，它就是已知的，就是在可控范围内的，就是不被惧怕的。可被预测的

如果将类型带入程序中，开发者就可以通过类型的方式进行思考，进行编码，那么程序中的任何事物都会变得可控，程序自然就会变得健壮。

程序中的数据类型是值的简要的表述方式。

### 3.类型系统带来的好处

类型系统为编辑器带来了更加精准的代码提示，以此来提升开发人员的编程体验。

在声明变量时明确告知编译器它的类型，编译器就知道该变量可以调用哪些属性和方法，当开发者调用了错误的属性或方法时，编译器会及时给出提示。

```ts
var name: string = "张三";
name.toFixed(2); // 属性"toFixed"在类型"string"上不存在
```

在声明函数时明确告知编译器参数的类型，当开发者调用该函数时如果传递的参数的类型不正确，编译器会及时给出提示。

在声明函数时明确告知编译器返回值的类型，当开发者返回的值的类型错误时，编译器会及时给出提示。

```ts
function sayHello(): string {
    return 100; // 不能将类型"number"分配给类型"string"。
}
```

在声明对象时告知编译器该对象下有哪些属性，当开发者访问了对象中不存在的属性时，编译器会及时给出提示。

```ts
const person = {name: "张三"};
person.age; // 类型"{name: string}"上不存在属性"age"。
```

类型系统使代码变得可预测，能够让开发者更早的发现代码存在的问题和潜在问题。

```ts
for (let i = 0; i < 5; i++) {
}
console.log(i); // 编译器会捕获到错误: cannot find name "i"
```

当重复生命同名变量时，编译器会立即给出提示

```ts
let colors = ["red", "green", "blue"];
// 无法重新声明块范围变量"colors"。
let colors = ["red", "green", "blue"];
```

## TS初体验

### 1.创建第一个TS应用

-----

- [ ] 安装 TypeScript 编译器,用于将 TypeScript 代码编译为 JavaScript 代码
- [ ] 安装axios库，用于发送请求
- [ ] 新建 01.createTS.ts 文件，用于编写代码
- [ ] 将 TypeScript 代码编译为JavaScript代码并执行

-----

第一步：安装 TypeScript编译器，用于将 `TypeScript` 代码编译为 `JavaScript` 代码

```bash
# 查看 npm安装目录
npm root -g
# 全局安装 TS 编译器
npm install -g typescript
# 通过查看 typescript 编译版本验证编译器是否安装成功
tsc --version
Version 4.6.3
```

第二步：安装axios库。用于发送请求

```bash
npm install axios
```

第三步：新建 01.createTS.js文件用于编写代码 TypeScript 程序文件的后缀名为 `.ts`
`01.createTS.ts`

```ts
import axios from "axios";

axios.get("https://cnodejs.org/api/v1/user/alsotang").then((response) => {
    const datas = response.data.data;
    console.log(datas.recent_topics.length);
});

const a: string = "111";
```

第四步：将 TypeScript 代码编译为 JavaScript 代码并执行。

```bash
# 编译ts文件
tsc 01.createTs.ts
# 执行js代码
node 01.create.js
```

### 2.优化工作流程

> 监控TS文件的变化，实现自动编译、自动执行代码

-----

- [ ] 安装nodemon、ts-node
- [ ] 创建应用启动脚本
- [ ] 通过应用脚本启动应用

-----

1. 全局安装 nodemon & ts-node

```bash
# nodemon: 监听文件的变化, 当 TypeScript 文件内容发生变动后调用 ts-node
# ts-node: 1. 调用 tsc 将 TypeScript 代码编译为 JavaScript 代码 2. 调用 node 执行 JavaScript 代码
npm install -g nodemon ts-node
```

2. 添加/修改项目执行环境
   `package.json`

```json
{
  "scripts": {
    "start": "nodemon index.ts"
  }
}
```

3. 创建 tscconfig 文件添加ts执行环境指向

```bash
# 创建 tsconfig.json
tsc --init
```

4. 修改检查模式为非严格模式
   `tsconfig.json`

```json
{
  "strict": false
}
```

5. 执行文件 编译命令

```bash
npm start
```

### 3.体验类型带来的好处

下列代码是通过 TS约束函数参数类型，调用函数时如果传入的参数类型错误，编译器会实时进行提示

```ts
import axios from "axios";

interface Datas1 {
    loginname: string;
    avatar: string;
    githubUsername: string;
    create_at: string;
    score: number;
    recent_topics: object[];
    recent_replies: object[];
}

axios.get("https://cnodejs.org/api/v1/user/alsotang").then((response) => {
    const datas: Datas1 = response.data.data;

    logUser(datas.recent_topics.length);
});

function logUser(length: number): void {
    console.log(`这名用户的信息长度是${length}`);
}
```

### 4.类型注释

TS中，开发者可以通过类型注释告知 TS编译器变量中存储的值的类型 ——类型断言

1. 类型断言

```ts
// 数值
let num: number = 1;
// 字符串
let str: string = "string";
// 布尔值
let boo: boolean = true;

// 内置对象
let date: Date = new Date();
// 字符串数组
let colors1: string[] = ["red", "orange"];
let colors2: Array<string> = ["red", "orange"];
// 数值数组
const rgba1: number[] = [255, 255, 255, 0];
const rgba2: Array<number> = [255, 255, 255, 0];

// 布尔数组
const booArr1: boolean[] = [true, false];
const booArr2: Array<boolean> = [true, false];

// 对象字面量 对象解构赋值
const point: { x: number; y: number } = {x: 100, y: 200};

// 自定义类
class Car {
}

let car: Car = new Car();

// 函数
let logNum: (n: number) => void;
logNum = (n: number) => {
    console.log(n);
};

// undefined
let nothing: undefined = undefined;
// null
let nothingMuch: null = null;
```

### 5.什么是使用类型注释（类型断言）

TypeScript 编译器具备类型推断功能，在没有显式设置变量类型的情况下，编译器将变量初始值的类型作为该变量的类型。

```ts
// let score: number
let score = 89;
```

也就是说当 TypeScript 编译器能够正确的推断出变量的类型时，开发者是不需要显式设置类型注释。

那么在哪些情况下 TypeScript 编译器不能正确推断出变量的类型呢？

如果变量声明后没有被立即初始化，TypeScript 编译器不能正确的推断出它的类型。

```ts
// 此时 TypeScript 编译器认为它是 Any 类型，即在该变量中可以存储任意类型的数据。
// 该变量失去了 TypeScript 中的类型检查功能
// let anything: any;
let anything;
anything = 12;
anything = "hello";
anything = true;
```

```ts
let colors = ["red", "green", "blue"];
// let foundColor: any
// 解决办法是要么设置初始值, 要么显式指定变量类型
let foundColor;

for (let i = 0; i < colors.length; i++) {
    if (colors[i] === "green") {
        foundColor = true;
    }
}
```

当调用的函数返回值为any类型时 我们就应该使用类型注释显式声明它的类型

```ts
// let json: string;
let json = '{"name": "张三"}';
// let person: any => let person: {name: string}
let person = JSON.parse(json);
```

```ts
// let json: string;
let json = "true";
// let isMarray: any => let isMarry: boolean
let isMarray = JSON.parse(json);
```

```ts
// let json: string;
let json = "100";
// let num: any => let num: number
let num = JSON.parse(json);
```

```ts
let json = '{"name": "张三"}';
let person: { name: string } = JSON.parse(json);
```

类型联合

```ts
let target: boolean | string = true;
target = "aaa"
//Type '111' is not assignable to type 'string | boolean'.
target = 111
```

### 6. 函数类型注释

通过类型注释告诉 TypeScript 编译器函数将要接收的参数的类型，函数将要返回的值的类型

```ts
const fun = (a: number, b: number): number => {
    return a + b;
};
fun(1, 2);
```

函数类型推断：TypeScript 编译器会试图推断函数返回值的类型，函数参数的类型 TypeScript 是推断不出来的。

注意：使用函数返回值类型推断时，在编写函数内部代码时就失去了类型检测功能，所以函数返回值类型推荐明确指定。

如果函数的返回值是 undefined 或者 null，可以指定函数的返回值为 void。

```ts
const logger = (message: string): void => {
    console.log(message)
    // return undefined;
    // return null;
}
```

如果一个函数永远不会有返回值 可以指定函数的返回值为never

```ts
const lagger = (message: string): never => {
    throw new Error("error");
};
```

在定义函数时，如果形参被定义为解构语法，则使用下面的方式为函数形参设置类型。

```typescript
const logWeather = ({date, weather}: { date: Date; weather: string }) => {
    console.log(date, weather);
};

const today = {
    date: new Date(),
    weather: "sunny",
};

logWeather(today);
```

```typescript
const profile = {
    age: 20,
    coords: {
        lat: 0,
        lng: 15,
    },
};

const {age}: { age: number } = profile;
const {
    coords: {lat, lng},
}: { coords: { lat: number; lng: number } } = profile;
```

### 7.数组类型注释

通过给数组添加类型注释 可以对数组中的元素进行类型约束

```ts
// 数组类型注释
const strArr1: string[] = ["aa", "bb"];
const strArr2: Array<string> = ["aa", "bb"];
const strArr3: string[][] = [["aa", "bb"]];

const importDates: (string | Date)[] = [new Date(), "apple"];
importDates.push(new Date());
importDates.push("watermelon");
// 类型number 不能赋值给类型 “string | Date”
importDates.push(100);
```

为什么要对数组中的元素进行类型约束

1. 从数组中取值时可以帮助 TS 编译器进行类型推断
2. 防止我们像数组中添加不兼容的值
3. 在使用数组方法时可以帮助 TS 编译器进行类型推断

### 8. 元组 观察下列代码中存在的问题。

在 employee 数组中我们约定在数组中下标为0的位置存储员工姓名，在下标为1的位置存储员工的年龄。

```typescript
var employee = ["张三", 20];
employee[0] = 30;
employee[1] = "李四";
```

以上代码存在的问题是 employee 数组没有被类型系统约束，没有约束每个数组元素对应的类型，导致在错误位置修改元素值时没有错误提示。

元组是 TypeScript 引入的一种新数据类型，它像数组一样工作但是有一些额外的限制：元组中元素个数是固定，元组中元素类型已知。

元组用来存储一些以特定顺序出现且相关关联的数据，通过元组可以约束元素个数及元素类型。

```typescript
const employee: [string, number] = ["张三", 20];
// 不能将类型"number"分配给类型"string"
employee[0] = 30;
// 不能将类型"string"分配给类型"number"
employee[1] = "李四";
```

```typescript
// 使用元组存储 RGB 颜色值及透明度
var bgColor: [number, number, number, number] = [0, 255, 255, 0.5];
```

```typescript
// 创建元组数组(二维数组)
var employees: [number, string][] = [
    [1, "Steve"],
    [2, "Tom"],
];
```

### 9.接口

接口用于对复杂的数据结构进行类型描述，TypeScript 编译器通过接口定义的规范对值进行类型检查。

```ts
interface Person {
    name: string;
    age: number;
    isMarry: boolean;
}

const porintPerson = (person: Person) => {
    console.log(person)
}
```

接口中定义的规范默认情况下都是必须被实现的，也就是说你定义的变量的值必须符合接口规范，少一个都不行。

在实现了接口规范的情况下，规范以外的值默认是允许存在的。

```ts
interface Reportable {
    summary(): string;
}

function printSummary(item: Reportable): void {
    console.log(item.summary());
}

const person = {
    name: "张三",
    summary() {
        return `您好, 我的名字叫${this.name}`;
    },
};

const drink = {
    color: "棕色",
    summary() {
        return "我喝的咖啡是${brow}的";
    },
};

printSummary(person);
printSummary(drink);
```

### 10.类

在现实世界中，类表示的是类别、分类、归类，是物以类聚的类，我们经常根据事物的特征将其进行分类，比如鸡鸭鹅狗猫，它们都属于动物的类别，再比如汽车、火车、高铁、飞机，它们都属于交通工具的类别。

在程序世界中，仍然使用类来描述一类具有相同特征的事物。

类是抽象的不代表具体的事物，通过类可以创建对象，对象才代表具体类别下的事物。

```ts
class Vehicle {
    drive() {
        console.log("run");
    }
}

const vehicle = new Vehicle();
vehicle.drive();

// 类的继承
class LittleCar extends Vehicle {
    brand = "BMW";
}
```

类和对象就是现实世界中图纸与房子的关系，图纸是对房子的描述，不是具体的房子，根据图纸创建出来的房子才是真实的。

可以将类理解为生成对象的"模板"，通过类可以批量生成对象。

