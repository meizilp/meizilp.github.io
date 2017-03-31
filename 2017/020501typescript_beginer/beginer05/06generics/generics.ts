function identity<T>(arg: T): T {
    return arg
}

let output1 = identity<string>("Hello")
let output2 = identity("Hello")


let mc: (arg: string) => string
let mt: <T>(arg: T) => T


interface GenericIdentityFn1 {
    <T>(arg: T): T
}
let mt1: GenericIdentityFn1

interface GenericIdentityFn2<T> {
    (arg: T): T
}
let mt2: GenericIdentityFn2<number>

class GenericClass<T> {
    zeroValue: T
    identiy(x: T) {
        return x
    }
    static add<U extends number>(x: U, y: U) {
        return x.valueOf() + y.valueOf()
    }
}

let sg = new GenericClass<string>()


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
