# 泛型

为了支持同样的代码逻辑用于不同类型的对象的机制。  
使用泛型而不是用any类型是因为any类型会放宽输入输出的限定，失去了ts的优点了。  

## 类型变量

`<T>`用于表示类型。

```ts
function identity<T>(arg: T): T {   //<T>跟在函数名后面；其它的地方就可以用T来代表某种类型了
    return arg
}
//完整形式，指定T的类型。如果此时参数传递的不是T指定的类型，就会提示参数出错
let output1 = identity<string>("Hello")

//省略T的类型，交给编译器通过参数来推断。如果编译器在复杂情况无法推断出来时，仍然需要指定类型
let output2 = identity("Hello")
```

## 泛型函数类型

```ts
let mc : (arg:string) => string //普通函数类型
let mt : <T>(arg:T) => T    //泛型函数类型。就是在前面增加泛型变量<T>，以供使用。
```

## 泛型接口

```ts
interface GenericIdentityFn1 {
    <T>(arg: T): T      //泛型变量在函数类型上，只有此函数类型可以用
}
let mt1: GenericIdentityFn1 //无需传入实际的类型

interface GenericIdentityFn2<T> {   //泛型变量在接口上，接口中的所有函数类型都能用
    (arg: T): T
}
let mt2: GenericIdentityFn2<number> //要传入实际的类型
```

## 泛型类

```ts
class GenericClass<T> { //泛型变量跟在类名后面
    zeroValue: T        //成员类型可以使用泛型变量
    identiy(x: T) {
        return x
    }
    static add<U extends number>(x: U, y: U) {  //静态部分不能使用类的泛型变量，必须用新的
        return x.valueOf() + y.valueOf()    //两个泛型变量不能直接相加，即使泛型是从number扩展而来也不行
    }
}
let sg = new GenericClass<string>()     //创建实例时把类型传入
```

## 泛型约束

限定泛型变量必须是从某个类型扩展而来，提供一些更精确的类型信息。`T extends string`，那么就可以使用`.length`属性了。
甚至从另一个泛型扩展都可以，比如`<T,U extends T[]>`

## 工厂函数中使用泛型

便于没有共同基类或接口的类型使用同一套逻辑来创建对象。

```ts
interface ConstructorOfObject<T> {
    //new关键字，构造器签名。返回一个T类型的对象。因为不同类型没有共同基类，所以不能用共同的基类作为返回值。
    new (name: string): T; 
}

//工厂函数。要求参数1传递约定的构造函数
function createObject<T>(ctor: ConstructorOfObject<T>, name: string): T {   //函数以及构造器参数都需要对泛型变量的引用
    return new ctor(name);  //使用传递的构造函数创建一个新的对象，不需要再传泛型变量
}

class Clock {
    _name: string
    constructor(name: string) { this._name = `C:${name}` }   //和构造器签名的约束一致
}
class Furniture {
    _name: string
    constructor(name: string) { this._name = `F:${name}` }   //和构造器签名的约束一致
}

let digital = createObject(Clock, "clock");    //把类的构造函数作为参数传递
let analog = createObject(Furniture, "table");  //可以不用明确泛型变量的具体值，由编译器进行推断
```
