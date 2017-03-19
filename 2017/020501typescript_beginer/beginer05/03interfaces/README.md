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

## 对字面对象属性的额外检查

在Typescript中为了减少可能发生的错误，会在使用字面对象时进行额外的检查。（字面对象：不通过变量引用，而是直接定义并使用的对象）

```ts
interface SquareConfig {
    color?: string
    width: number
}

function createSquare(config:SquareConfig) {
    console.log(config.color)
}

createSquare({colour:"red", width:100}) //Error。对象字面量额外检查会发现多了colour

let sconf = { colour: "blue", width: 100, size: 100 }
createSquare(sconf) //使用非字面量，只要有width就行。不会额外检查，多出来的colour以及size没啥影响。
```

## 用接口描述函数类型

要用接口描述函数类型，那么接口中包含一个函数签名即可。函数签名就好像没有函数名的函数声明，参数列表以及返回值都仍然存在。

```ts
interface SearchFunc {
    (source: string, subString: string): boolean    //没有函数名；参数名及类型都要有；返回值类型要有
    //(source: string, max: number): boolean
}

let mySearch1: SearchFunc = function (src: string) {
    return true;
}
```

* 赋值时参数名可以和接口中声明的不一样
* 但参数类型按照顺序一定要和声明中的兼容
* 参数可以少但是不可以多，因为多了就不知道如何检测多出来的参数的类型
* 返回值类型必须和声明中要求的一致
* 可以有多个函数签名，但如果不兼容那么会出现赋值时无论如何都不能满足要求的情况
* 可以还有其他的属性，就属于后面讲的混合类型

## 用接口描述可索引的类型

可索引的类型指的是可以通过类似a[10]这种形式通过索引获取值的类型。接口使用索引签名来描述可索引的类型。

### 数字索引

```ts
interface IndexableNumberIndex {
    [i: number]: string     //数字类型的索引。最多只能有一个数字索引。
}
let ini1: IndexableNumberIndex = ["abc", "bcd"] //因为数组是支持数字索引的，所以可以用数组赋值
console.log(ini1[0])    //outputs abc
let ini2: IndexableNumberIndex = {} //也可以指向一个对象
ini2[0] = "abc2"        //然后通过数字索引的形式赋值
console.log(ini2[0])    //outputs abc2。通过数字索引的形式取值
```

### 字符串索引

```ts
interface IndexableStringIndex {
    [s: string]: string //字符串类型的索引。最多只能有一个字符串索引
}
//let isi1:IndexableStringIndex = ["abc"]   //Error数组不支持字符串索引，所以不能用数组赋值了
let isi2:IndexableStringIndex = {}  //先指向一个对象
isi2["a"] = "a"     //通过字符串作为索引赋值
console.log(isi2.a) //也可以通过.的形式访问
```

字符串索引能够很好的描述词典模式。

```ts
interface IndexableStringIndex {
    [s: string]: string //支持任意的名称作为字符串索引
    name?: string   //name名称是已知的
    //age?: number  //Error返回值必须是字符串索引约定的，因为.age也会作为字符串索引去取值。
}
let isi2: IndexableStringIndex = {}
isi2["a"] = "a"
isi2.name = "unknown"   //.name会有上下文提示
console.log(isi2.a)
console.log(isi2.name)
```

### 只读索引

```ts
interface IndexableStringIndex {
    readonly [s: string]: string    //增加关键字
    name?: string
}
let isi2: IndexableStringIndex = { a: "a" } //对象初始化时带有值
//isi2["a"] = "a"   //字符串索引已经只读了，所以不能通过"a"写入了。如果是只读数字索引，同样也不能通过数字写入了。
isi2.name = "unknown"   //但是name属性仍然可以写入，虽然其也会被转换为字符串索引
console.log(isi2.a)
console.log(isi2.name)
```

### 数字索引和字符串索引同时出现

* 对象默认就可以通过[]形式使用数字索引和字符串索引

```ts
let dd = {}
dd["a"] = "dd:a"    //只能使用[]形式
dd[10] = 100
console.log(dd["a"])    //只能使用[]形式，不能使用.形式
console.log(dd[10])
```

* 通过接口声明两种索引同时出现

此时数字索引返回值必须是字符串索引的子类型，因为代码实现是通过把数字转换成字符串之后去取值。

```ts
class Animal {
    name: string;
}
class Dog extends Animal {
    breed: string;
}

interface TwoIndexTypes{
    [x: string]: Animal;    //因为都会转换成字符串索引，所以外面只能得到字符串索引对应的类型Animal。
    [x: number]: Dog;   //Dog可以转换为Animal，没问题。如果两个索引的返回值类型交换一下，则Animal无法转为Dog就不行了。
}
```

## Class类型

### Class实现接口

接口对类公共部分的实现进行一个约束。

```ts
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date);
}

class Clock implements ClockInterface {
    currentTime: Date;      //必须要有接口中的成员
    setTime(d: Date) {      //必须实现接口中的方法
        this.currentTime = d;
    }
    constructor(h: number, m: number) { }
}
```

### Class的静态部分与实例部分在接口实现时的不同

类的的静态部分包含类的**构造函数和静态**属性、方法；  
类的实例部分包含**非静态**属性及方法。

* 当类实现接口时，只会使用类的实例部分检查是否符合接口的要求。  
    所以如果实现接口的函数或者成员是静态的，那么也会因为无法在实例部分找到而不能通过检查。
    ```ts
    interface ClockInterface {
        currentTime: Date;
    }

    class Clock implements ClockInterface {  //Error。Clock会无法通过检查
        static currentTime: Date;   //因为静态成员不会被用来检查是否符合接口的要求
        constructor(h: number, m: number) { }
    }
    ```

* 通过构造器签名实现工厂模式  
    首先因为构造函数属于类的静态部分，所以类的构造函数无法用来作为构造器签名的实现。
    ```ts
    interface ClockConstructor {
        new (hour: number, minute: number); //构造器签名。new关键字；无函数名；无返回值。
    }

    class Clock implements ClockConstructor {   //Error。Clock无法通过检查，因为构造器签名没有被实现
        currentTime: Date;
        constructor(h: number, m: number) { }   //构造函数属于类的静态部分，无法当作构造器签名的实现
    }
    ```
    所以构造器签名用来对变量进行约束，而不是用来给类进行实现。
    ```ts
    interface ClockConstructor {//此接口用于参数类型检测，不供实现
        new (hour: number, minute: number): ClockInterface; //构造器签名
    }
    interface ClockInterface { //此接口供类实现
        tick();
    }

    //工厂函数。要求参数1传递约定的构造函数
    function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
        return new ctor(hour, minute);  //使用传递的构造函数创建一个新的对象
    }

    class DigitalClock implements ClockInterface {
        constructor(h: number, m: number) { }   //和构造器签名的约束一致
        tick() {    //实例部分实现接口要求的方法
            console.log("beep beep");
        }
    }
    class AnalogClock implements ClockInterface {
        constructor(h: number, m: number) { }
        tick() {
            console.log("tick tock");
        }
    }

    let digital = createClock(DigitalClock, 12, 17);    //把类的构造函数作为参数传递
    let analog = createClock(AnalogClock, 7, 32);
    ```

## 扩展接口

```ts
interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape { //extends关键字。从Shape接口扩展
    sideLength: number;
}

interface Square extends PenStroke { //同时从PenStroke接口扩展。
     sideLength: number;
}

let square = <Square>{};    //强制转换
square.color = "blue";      //同时拥有被扩展接口的成员
square.sideLength = 10;     //本接口的成员
square.penWidth = 5.0;      //从另一个接口扩展的成员。从多个接口扩展也可以写作：interface Square extends Shape,PenStoke{}
```

## 配合类型断言实现混合类型

一个对象既可以作为函数又可以作为带有额外属性的对象使用很常见，通过接口可以实现这种需求。

```ts
interface Counter {
    (start: number): string;    //函数签名
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };    //把函数转为接口对象
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}

let c = getCounter();
c(10);      //直接当作函数使用
c.reset();  //调用方法
c.interval = 5.0;   //设置属性
```

## 接口继承类

接口从类中扩展时会继承类的成员（包括私有成员）但不包括实现。  
如果类中没有私有成员，那么从这个类扩展的接口可以指向一样解构的其他的类；但如果类中有私有成员，因为类中的私有成员不能在其他类访问，那么这个接口就只能指向此类以及由此类派生的子类了。

```ts
class Control {
    private state: any;     //私有成员，只能本类及子类看到。
}

interface SelectableControl extends Control {   //接口从类继承
    select(): void;     //增加一个select方法
}

class Button extends Control {
    select() { }
}

class MyImage {
    private state: any;
    select() { }
}

let myCtl1: SelectableControl = new Button()    //button中有私有变量state，有select方法，可以
//let myCtl3: SelectableControl = new MyImage() //Error。虽然有同名变量，但实际上不是一个，所以不能这么用。如果Control类以及MyImage类中的state都不是private的，那么这么用就不会错。
```