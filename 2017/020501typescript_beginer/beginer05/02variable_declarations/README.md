# 变量声明

## var 声明

不要用了。

## let 声明

语法：`let hello = "hello"`

### 块作用域

1. 变量只能在同一个块作用域内看到
1. 变量未声明之前不能使用

### 重定义及变量屏蔽

1. 同一个块作用域内不能有重复定义的同名变量
1. 嵌套作用域时内部作用域的变量会屏蔽上级作用域的同名变量

### 块作用域变量捕获

1. 每次进入块作用域时，都会新创建一个变量环境，即使作用域内代码已经执行完毕，这个变量环境仍然存在（其包含的变量不会消失）
1. 基于第1条描述，块作用域外引用块作用内的变量时，不会出错。只有所有引用都没有之后，变量环境才会被回收。
1. let出现在**循环体中**时，每次迭代都会创建一个新作用域，这样即使本次循环结束后异步访问当时通过let声明的变量也能取到当时的值，但如果是var就会出现只能取到最后一次的值。

  ```ts
  let k = 100   //在循环体外let声明
  for (let i = 0; i < 3; ++i) {
    var j = i * 10                //j使用的var声明，就只能输出最后的值。如果改成let声明，那么每次就是i的10倍了。
    setTimeout(function () {      //在异步函数中调用，此时已经离开for的块作用域。
      console.log(`i:${i} j:${j} k:${k}`)
    }, 100);
  }
  k = 200
  ```

  ```sh
  i:0 j:20 k:200        #i在循环体内，let声明；所以每次都是新作用域中的变量
  i:1 j:20 k:200        #j在循环体内，var声明；所以每次都是最后的值，而不是新作用域中的变量
  i:2 j:20 k:200        #k不在循环体内，let声明；仍然是最后的值，而不是新作用域中的变量
  ```

PS：这儿就是和C语言根本上的不同。在C语言中，局部变量分配在栈内存上，当作用域内代码执行完毕，所占用的栈内存也就释放了。

## const 声明

1. 拥有和let相同的作用域规则
1. 声明时必须有初始值
1. 被赋值之后不能改变。但是如果指向的是对象，对象内部成员的值还是可以修改的，只是这个变量仍然只能指向这个对象。

## 解构

从数组或者对象中快捷的取值赋给变量。

### 解构数组

* 数组中的值赋给变量
    ```ts
    let [first, second] = [1, 2]    //[]在左侧，解构后可以直接使用first、second这两个新创的变量。
    ```
* 作用于函数参数
    ```ts
    function f([first, second]:[number, number]) {  //参数类型是个元组，其元素会被赋值给新创建的变量
        console.log(first)
        console.log(second)
    }
    ```
* 剩余元素赋值给新的数组
    ```ts
    let [first, ...rest] = [1,2,3,4]    //...语法
    console.log(first)  //outputs 1
    console.log(reset)  //outputs [2,3,4]
    ```
* 只取部分元素
    ```ts
    let [first] = [1,2,3,4]
    console.log(first)  //1
    let [,second,,fourth] = [1,2,3,4]
    console.log(second) //2
    ```

### 解构对象

* 把对象属性值赋给同名变量
    ```ts
    let o = {           //{}在右侧是定义对象
        a:"foo",
        b:12,
        c:"bar"
    }
    let {a, b} = o  //{}在左侧是对象解构；o.c的值没用到
    console.log(a)  //outputs o.a
    let {a, d} = o //Error，因为o中没有d这个名字的属性
    ```
* 剩余属性赋值给新的对象
    ```ts
    let o = { a: "a", b: 6, c: "c", d: "d" }
    let { a, c, ...remain } = o
    console.log(c)          //ouputs o.c
    console.log(remain)     //outputs { b: 6, d: 'd' }，剩下的没有被取走的值
    ```
* 把对象属性值赋给重命名的变量
    ```ts
    let {a:newName1, b:newName2} = o    //newName1=o.a
    ```
    在解构语法中属性名冒号后面是其新名字而不是类型。如果要指明类型，那么要给整个解构体指明类型，写法如下：
    ```ts
    let {a:newName1, b:newName2}:{a:string, b:number} = o
    ```
* 指定属性解构默认值
    在ts中，对象的属性可以是可选的，如果可选属性的实际值是undefined，解构时变量就会是默认值。
    ```ts
    let d: { da: number, db: string, dc?: string }  //dc是可选属性
    d = { da: 100, db: "bb" }                       //dc没有赋值
    let { da, db = "db", dc = "dc" } = d            //db、dc都指定了解构时的默认值，虽然db不是可选属性也不会出错
    console.log(db)     //outputs bb。因为db属性有值，所以默认值不起作用
    console.log(dc)     //ouputs dc。因为dc属性没有值，所以得到解构时指定的默认值
    ```
* 在函数声明中使用解构
  * 直接解构参数
    ```ts
    function f1({ a, b }) {     //参数直接被解构为变量a和变量b
        console.log(a)
        console.log(b)
    }
    f1({ a: "a1", b: "b1" })    //outputs: a1 b1
    ```
  * 带有可选属性的解构体
    ```ts
    function f2({ a, b }:{a:string, b?:string}) {     //参数直接被解构为变量a和变量b。对象的b属性是可选的
        console.log(a)
    }
    f2({a: "a2"})    //outputs: a2。属性b是可选的，所以对象可以不用传入
    ```
  * 带有默认值的函数参数解构
    ```ts
    function f3({ a, b = "nothing" }: { a: string, b?: string } = { a: "default_a" }) {
        console.log(a)
        console.log(b)
    }
    f3()    //输出 default_a,nothing。没有传递任何参数，那么使用参数的默认值。参数默认值不包含b属性，使用b属性的默认值。
    f3({ a: "a3" }) //输出a3,nothing。传递了参数，但是不包含b属性，使用b属性的默认值
    f3({ a: "a3", b: "b3" })    //输出a3,b3。传递了参数，包含所有的属性值
    f3({})      //Error。对象中没有不可选的a属性
    ```

## 展开

将一个对象的所有属性嵌入到另一个对象或者将一个数组的所有元素嵌入到另一个数组中。

### 展开数组

被展开数组中的元素按照先后顺序出现在新数组中。

```ts
let first = [1,2]
let second = [3,4]
let both = [0, ...first, ...second, 5]  //[0,1,2,3,4,5]
```

### 展开对象

被展开对象的属性值出现在新对象中，展开时按照从左到右的顺序，后出现的属性值会覆盖先前的同名属性值。

```ts
let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
let search = { ...defaults, food: "rich" };     //defaults对象被展开；后出现的food值覆盖defaults中的值
```

对象展开时，只是把属性值展开，方法不会带入到新对象中去。

```ts
class C {
  p = 12;
  m() {
  }
}
let c = new C();
let clone = { ...c };
clone.p; // ok
clone.m(); // error!  m是个方法，不会带入新对象。
```
