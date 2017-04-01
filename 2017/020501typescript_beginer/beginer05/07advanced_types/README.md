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
if (isFish(pet)) {  //通过类型保护返回的类型断言把pet的两种  类型分离
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

## 字符串字面量类型

限定字符串只能取固定的值。有点象字符串的枚举。比如：`"abc"|"def"|"hij"`，那么变量的值就只能是这3个值之一。

## 多态this

## Symbol类型
