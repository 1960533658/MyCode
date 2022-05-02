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
const point: { x: number; y: number } = { x: 100, y: 200 };

// 自定义类
class Car {}

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

let json: string = '{"name": "张三"}';
let person = JSON.parse(json);

// 类型联合
let target: boolean | string = true;
target = "aaa";
//Type '111' is not assignable to type 'string | boolean'.
// target = 111;

// 函数类型注释
const fun = (a: number, b: number): number => {
  return a + b;
};
fun(1, 2);

const logger = (message: string): void => {
  console.log(message);
};

const lagger = (message: string): never => {
  throw new Error("error");
};

const person2 = ({ name, age }: { name: string; age: 10 }) => {};

// 数组类型注释
const strArr1: string[] = ["aa", "bb"];
const strArr2: Array<string> = ["aa", "bb"];
const strArr3: string[][] = [["aa", "bb"]];

const importDates: (string | Date)[] = [new Date(), "apple"];
importDates.push(new Date());
importDates.push("watermelon");
// 类型number 不能赋值给类型 “string | Date”
// importDates.push(100);

// 元组
let employee: [string, number] = ["张三", 20];
let employee1: [number, string][] = [
  [1, "Jerry"],
  [2, "Tom"],
];

// 接口
interface Person {
  name: string;
  age: number;
  isMarry: boolean;
}

const porintPerson = (person: Person) => {
  console.log(person);
};

// 类
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
