# 基本类型

## 布尔类型

类型声明：boolean；只有两个值：true、false。

```ts
let isDone: boolean = false;
```

## 数字类型

类型声明：number

```ts
let decimal: number = 6;    //十进制
let hex: number = 0xf00d;   //十六进制以0x开头
let binary: number = 0b1010 //二进制以0b开头
let octal: number = 0o744   //八进制以0o开头
```

## 字符串类型

### 普通字符串

类型声明：string

```ts
let color: string = "blue"; //双引号环绕
color = 'red';              //单引号环绕
```

### 模板字符串

可以嵌入变量

```ts
let name: string ="Bob"
let sentence: string = `Hello, ${name}` //‘`’环绕；变量${变量名}
```

## 数组类型

### 基本数组类型

数组中的所有元素都是同一个类型。  
类型声明：元素类型[]或Array<元素类型>

```ts
let list: number[] = [1,2,3]        //元素类型[]形式
let list2: Array<number> = [1,2,3]  //Array<元素类型>形式
```

### 元组

* 数组中的元素类型可以不同；
* 访问声明索引范围内的元素时元素类型时确定的；
* 访问声明所以范围外的元素时，元素类型是数组中所有类型的联合类型；

```ts
let x: [string, number];    //已知两个元素类型；一个是string，一个是numbera。
x = ["Bob", 20]             //OK，类型一一对应。
x = [20, "Bob"]             //错误，类型不对应。
x[0].substr(1)              //OK，元素0是string类型，可以调用substr
x[1].substr(1)              //错误，元素1是number类型，不可以调用substr
x[2] = "word"               //OK，元素2是string|number联合类型，字符串符合。
x[3] = true                 //错误，元素3也是string|number联合类型，布尔型不符合。
x[4].toString()             //OK,元素4也是string|number联合类型，string和number都有toString()
x[5].substr(1)              //错误，元素5也是string|number联合类型，substr只存在string中，所以不能调用
```

## 枚举

类型声明： enum 枚举类型名称｛值名称列表} 可以指定值也可以不指定

```ts
enum Color {Red, Green, Blue = 4, Yellow}   //Red默认值为0；Yellow为5=Blue+1
let c: Color = Color.Green          //给枚举类型变量使用枚举值名称赋值
let colorName: string = Color[4]    //colorName是Blue，通过值4找到了名称Blue

//const修饰枚举，那么生成的代码中不会有Enum对象，可以避免生成多余的代码和间接引用，但也无法利用枚举值获取到对应的枚举名称了
const enum Directions {Up, Down, Left, Right}
```

## “任意”类型

类型声明：any  
和Object类型相同的地方是可以赋任何类型的值；和Object类型不同的是any类型可以调用任何方法而Object类型就只有很少的几个方法。

## 空类型

类型声明：void  
只能赋值：null或者undefined。一般用于函数无返回值。

## null 和 undefined

类型声明：null、undefined  
null和undfined是其它类型的子类型，也就是可以赋值给其它所有类型（但是不建议这么使用，建议打开strictNullChecks，这样null和undefined就不能赋值给其它类型了。如果需要给其它类型赋值null或者undefined，比如给string类型赋值null或undefined，那么可以把变量声明为string|null|undfined联合类型）。

## Never类型

描述从不发生的类型。（不知道用在什么地方）

## 类型断言

手动指定某个变量的类型。  
形式：<类型> 或 变量 as 类型。在tsx类型的文件中只能用as形式，因为尖括号被识别为html了。

```ts
let v: any = 'this is a string'
let l: number = (<string>v).length  //尖括号<>形式
l = (v as string).length       //as操作符形式
```
