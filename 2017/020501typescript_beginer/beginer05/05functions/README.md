# 函数

## 命名函数及匿名函数

```ts
function add(x,y) { //命名函数；关键字function；function和参数之间是函数的名字
    return x + y
}

let myAdd = function(x,y) {return x+y}  //匿名函数。关键字function和参数之间没有函数名字。
```

## 变量捕获

函数可以使用函数体外部的变量。

```ts
let z = 100
function addToZ(x,y) {
    return x + y + z      //使用了函数体外部定义的变量。参见《变量声明》。
}
```

## 函数类型

1. 包含参数、返回值类型的完整函数写法
    ```ts
    function add(x:number, y:number) : number { //参数后有类型标注；参数列表后有返回值类型标注
        return x + y        //ts能根据返回值推断出返回值类型，返回值的类型也可以省略不写
    }
    ```
1. 函数类型的完整写法
    ```ts
    let myAdd:(x:number,y:number)=>number =     //包含参数列表和返回值两部分；通过=>来连接；参数类型不能省略，否则会被推断为any；如果没返回值，那么要明确指定为void
        function(x:number, y:number):number {return x + y}  //赋值时值的参数名称可以和类型中的不一样
    ```
1. 通过函数类型简化函数定义的写法
    ```ts
    let myAdd:(x:number, y:number)=>number =
        function(x,y) {return x + y}    //函数定义中可以省去参数、返回值的类型，这些信息可以从函数类型中推断出来。
    ```

## 可选参数和默认参数

* 可选参数以及默认参数在调用时都不强制一定要传参。
* 当不传参时，可选参数的值是undefined，默认参数的值就是默认值(默认参数传参为undefined时，参数值也是默认值)。
* 可选参数：`lastname?:string`，在参数名称后增加符号“?”。
* 默认参数：`lastName="Smith"`，在参数后面通过符号“=”指定默认值。
* 可选参数必须在必须参数的后面；默认参数位置不受限制。
* 当采用默认参数时其函数类型会被转换为和可选参数一样的函数类型。`(x:number,y?:number)=>number`，y无论是可选参数还是默认参数都是这一个函数类型。

## 剩余参数

```ts
function buildName(firstName:string, ...restOfName:string[]) {  //符号“...”加上存储剩余参数的数组名；在函数类型定义中也是这种写法
    return firstName + " " + restOfName.join("")        //即使没有剩余参数，这个数组也会创建，其长度为0
}
let employeeName = buildName("Joseph", "Samuel", "Lucas", "Mike")   //后面的三个参数都会存到数组restOfName中
```

## this

### this和箭头函数

js中this的值在函数被调用时才确定；而通过箭头函数可以在函数创建时就绑定this。

## 重载


