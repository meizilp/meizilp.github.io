# 接口

Typescript核心理念是通过值的形状来进行类型检查，接口用来为这些类型命名。

## 第一个接口

```ts
interface LabeledValue {    //定义接口名称
    label: string           //定义接口成员
}

function printLabel(labeledObj: LabeledValue) { //指定参数类型
    console.log(labeledObj.label)   //从接口中得知有label属性
}

let myObj = { size: 10, label: "Size 10 Object" }   //对象有label属性就满足约束了
printLabel(myObj)
```

* 在Typescript中接口是用来约束值的形状，而不是用来实现的。
* myObj有接口要求的属性，那么就是满足的，多余的属性以及属性的顺序没有影响。
* myObj的类型不一定是接口定义的名称，如果改成`let myObj:LabeledValue`，那么反倒会因为多了`size`属性而报错。

## 可选属性

接口中的属性可以设定为是可选的，这样对象有或者没有这些属性都满足约束。不过接口定义中并不能给可选属性指定默认值。

```ts
interface Rect {
    width: number
    height: number
    color?: string  //可选属性。在属性名称后加问号
}
let rect1: Rect = { width: 100, height: 100 }   //没有color可以
let rect2: Rect = { width: 100, height: 100, color: "red" } //有color也可以
```

## 只读属性

对象的只读属性只能在对象刚创建的时候赋值。变量用const来只读，属性用readonly来只读(因为const声明时必须给初始值，而接口中不能这么干)。

```ts
interface Point {
    readonly x: number
    readonly y: number
}
let p1: Point = { x: 10, y: 20 }
//p1.x = 5 只读属性初始化后不能再修改
let roa: ReadonlyArray<number> = [1, 2, 3, 4]   //只读数组
```

