# 高级类型

## 联合类型

联合类型表示一个值可以是几种类型之一。比如`string|number|boolean`。如果一个值是联合类型，
那么使用时只能使用所有类型中共有的成员。

## 交叉类型

交叉类型说明这个类型的对象同时拥有多种类型的成员。比如`Person&Serializable&Loggable`。

## 类型保护与类型分离

### 类型断言

断言某个变量值是什么类型。格式：`参数名 is 类型`，比如`pet is Fish`就断言`pet`是`Fish`类型。  

### 类型保护

一个函数，返回值是类型断言。

#### 用户定义的类型保护

```ts
function isFish(pet: Fish | Bird): pet is Fish {    //返回值是一个类型断言
    return (<Fish>pet).swim !== undefined; //pet强制转换为Fish，然后如果swim方法存在那么就返回pet is Fish成立
}

function getSmallPet(): Fish | Bird {
    // ...
}
let pet = getSmallPet();
if (isFish(pet)) {  //通过类型保护返回的类型断言把pet的两种类型分离
    pet.swim();     //此时ts已经知道pet是Fish类型
}
else {
    pet.fly();      //并且ts也知道pet这儿是Bird类型
}
```

#### typeof形式的类型保护

断言某个值的类型是某个原始类型的快捷写法。首先看下常规的写法：

```ts
function isNumber(x:any):x is number {
    return typeof x === "number"
}
```

TS支持将`typeof v === "typename"`或`typeof v !== "typename"`这两种形式直接识别为类型保护，
无需再封装到函数中去。`"typename"`只能是`"number"`、`"string"`、`"boolean"`、`"symbol"`之一。
如果是其它字符串或者把`"typename"`位置放到前面，那么就不会被识别为类型保护了。

```ts
function padLeft(value: string, padding: any) {
    if (typeof padding === "number") {      //被识别为typeof形式的类型保护
        return Array(padding + 1).join(" ") + value;    //此时已经知道padding是number类型
    }
    if (typeof padding === "string") {
        return padding + value;     //此时已经知道padding是string类型
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}
```

#### instanceof形式的类型保护

TS支持将`变量 instanceof 构造函数`形式直接识别为类型保护。

## Nullable 类型

当Typescript的编译标志`--strictNullChecks`打开时，普通类型的值是不能被赋值`null`以及`undefined`这两个值。
如果此时要实现可以被赋值这两个值，那么就要使用联合类型，比如`string|null`，这样的类型的变量才能赋null值。
这种联合类型称之为Nullable类型。

对于可选参数和可选属性，其类型编译时会自动扩展加上`|undefined`。

Nullable类型的断言：

```ts
function broken(name: string | null, epithet: string): string {
    return name.charAt(0) + '.  the ' + epithet; // 如果打开了标志，这儿编译器就会提示name可能为null的错误`
}
function fixed(name: string | null, epithet: string): string {
    return name!.charAt(0) + '.  the ' + epithet; // 在变量名字后面增加符号'！'，可以可以告诉编译器这儿不会为null
}
fixed(null, "aha")  //但是仍然可以传递null进去，这时编译期不会出错，但是执行时会出错

function fixed2(name: string | null, epithet: string): string {
    name = name || "default"    //保证name肯定不会null
    return name.charAt(0) + '.  the ' + epithet; // 此时不加‘!’编译期也不会提示错误了
}
```

## 类型别名

通过`type 新类型名字 = 类型`形式给已有的类型起一个新的类型名字。

```ts
type Name = string;     //给string一个新名字Name
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;  //新名字本身也可以用来再起一个新名字
function getName(n: NameOrResolver): Name {
    if (typeof n === "string") {
        return n;
    }
    else {
        return n();
    }
}
type Container<T> = { value: T };   //也可以带有泛型
type Yikes = { s: Array<Yikes> };   //也可以引用自己
//type Yikes2 = Array<Yikes2>;  //但是不能这样使用
```

### 类型别名和接口的对比

* 别名不能被`extended`和`implements`
* 当某些shape无法用接口描述时，可以命名为别名

## 字面量联合类型

* 字符串：限定字符串只能取固定的值。有点象字符串的枚举。比如：`"abc"|"def"|"hij"`，那么变量的值就只能是这3个值之一。
* 数字：比如`80|443`
* 布尔：`true|false`

## 可识别联合类型

```ts
interface Square {
    kind: "square";     //多个接口都有一个同名的属性；其使用字符串字面量作为属性值
    size: number;
}
interface Rectangle {
    kind: "rectangle";  //同名属性
    width: number;
    height: number;
}
interface Circle {
    kind: "circle";     //同名属性
    radius: number;
}

type Shape = Square | Rectangle | Circle;   //Shape为这几个有同名属性的接口的联合类型

function area(s: Shape) {
    switch (s.kind) {   //通过同名属性的值可以把联合中的不同类型识别出来
        case "square": return s.size * s.size;          //可以直接使用square中的属性
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
    }
}
```

### switch分支覆盖检测

Typescript编译器可以针对可识别联合类型或者有限集的值检测是否有遗漏的case分支。

```ts
function area(s: Shape) {   //function area(s: Shape): number 返回值被推断为number类型
    switch (s.kind) {   //3个可能的分支都覆盖了
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
    }
}
```

```ts
function area(s: Shape) {   //function area(s: Shape): number | undefined 返回值被推断为number|undefined类型
    switch (s.kind) {   //只覆盖了两个分支，所以剩下的那个分支返回undefined
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
    }
}
```

如果想要编译器怎对有case分支遗漏进行错误提示，那么有两种方法：  
第一种：打开strictNullChecks标志，并且明确指明函数的返回值，而不是由ts自动推断

```ts
function area(s: Shape):number {   //明确指明返回值要number，编译器会指出返回值不符合要求
    switch (s.kind) {   //只覆盖了两个分支
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
    }
}
```

第二种：利用never类型

```ts
//参数x要是never类型，因为只有never类型的值才可以赋值给never类型，其他的都不行，这样保证别的类型不会与x兼容，编译器可以提示错误
function assertNever(x: never): never { //never返回值代表进入此函数就不会返回了，其实去掉也对检测遗漏分支的目的没有什么影响
    throw new Error("Unexpected object: " + x); //如果去掉了never返回值，那么返回值会被推断为void类型
}

function area(s: Shape) {   //返回值可以不指明
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        default: return assertNever(s); //会提示s是缺少的Circle类型，无法转为never类型，报错
    }
}
```

ps:void和never的区别  
never表示函数永远不会返回，函数内会无尽循环或者抛出一个异常，函数的返回值（语义上的，给编译器做检测用的）只能赋值给never类型的变量；
void则表示函数还是会返回的，在没有strictNullChecks标志时，void可以赋值给某些类型的变量。

## 多态this

使用this关键字作为返回值类型，便于连贯调用。

```ts
class BasicCalculator {
    protected value: number
    constructor(initValue: number) {
        this.value = initValue
    }
    public addReturnBasic(operand: number): BasicCalculator {   //明确返回本类
        this.value += operand
        return this
    }
    public addReturnThis(operand: number): this {   //明确返回this
        this.value += operand
        return this
    }
    public currentValue() {
        return this.value
    }
}

class AdvancedCalculator extends BasicCalculator {
    public mul(operand: number) {   //会被推断返回this
        this.value *= operand
        return this
    }
}

let vb = new BasicCalculator(2)
    .addReturnBasic(10)
//.mul(3)                   //因为返回的BasicCalculator，所以无法连贯调用mul
console.log(vb.currentValue())
let va = new AdvancedCalculator(3)
    .addReturnThis(2)   //返回的是this，成了AdvancedCalculator，所以可以调用mul
    .mul(3)
console.log(va.currentValue())
```

## 索引类型

## 映射类型

## Symbol类型
