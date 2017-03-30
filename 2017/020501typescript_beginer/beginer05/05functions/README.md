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

## 箭头函数

箭头函数总是匿名函数；语法更简洁；不绑定自己的this。适合做非方法函数，不能用作构造函数。

```ts
//(p1: number, p2: number, pn: number) => void。完整写法：(参数列表) => {表达式}。
let f1 = (p1: number, p2: number, pn: number) => { console.log(`${p1} ${p2} ${pn}`) }

//(p1: number, p2: number, pn: number) => number。表达式如果只有一句，并且值就是返回值，那么表达式的{}可以省略
let f2 = (p1: number, p2: number, pn: number) => p1 + p2 + pn

//(p1: any) => void。参数类型也可以省略
let f3 = (p1) => { console.log(`${p1 * 2}`) }

//(p1: any) => number。只有一个参数时，参数列表的()可以省略
let f4 = p1 => p1 * 2

//没有参数时，参数列表的()不能省略
let f5 = () => { console.log("Hello") }

//省略表达式的{}时，如果返回对象字面量时要使用()把对象字面量包起来
let f6 = param => ({ foo: param })

//参数列表支持默认值、剩余参数、解构赋值
let f7 = ([a, b] = [1, 2], ...rest) => a + b
```

## 函数中this的值

this的值在不同的实现中不一样，所以坑多。

```js
var x = 1;
function test(){
　this.x = 0;
}
test();
alert(x); //在浏览器中x的值是0,因为test调用时this指向global覆盖了原来的值；而如果用node v6.3.1运行则x的值仍然是1，应该是this指向了function自己的this。
```

下面的内容来自于typescript手册：(用浏览器以及node v6.3.1都是同样效果)
js中this的值在**函数被调用时**才确定；而通过箭头函数在**函数创建时**就绑定this的值。

会出错的代码

```ts
let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function() {
        return function() {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);
            //this在调用时指向global，没有suits成员，会报错
            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();   //拿到了返回的普通函数
let pickedCard = cardPicker();  //调用时这个函数内部的this指向global

console.log("card: " + pickedCard.card + " of " + pickedCard.suit);
```

不会出错的代码：（关于箭头函数与普通函数中this的对比参见《JSX章节》

```ts
let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function () {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);
            //创建箭头函数时this指向deck，调用时仍然指向deck对象，有suits成员，所以不会出错。this此时为any类型。
            return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
        }
    }
}

let cardPicker = deck.createCardPicker();   //拿到新创建的箭头函数
let pickedCard = cardPicker();  //创建箭头函数时this指向deck，那么调用箭头函数时仍然指向deck

console.log("card: " + pickedCard.card + " of " + pickedCard.suit);
```

this作为参数：(typescript中用来确定类型)

```ts
interface Card {
    suit: string;
    card: number;
}

interface Deck {        //增加interface来描述类型
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card;
}

let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function (this: Deck) {   //参数列表第一个参数增加this以及其类型
        return () => {  //创建箭头函数时就知道this是什么类型了。箭头函数自身不带this，用的是创建时的上下文。
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

console.log("card: " + pickedCard.card + " of " + pickedCard.suit);
```

## 重载

函数根据传入参数个数或者类型的不同，执行不同的逻辑。和可选参数、默认值等等还不一样，重载可以只有参数类型不同。

```ts
function pickCard(x: {suit: string; card: number; }[]): number; //函数类型声明
function pickCard(x: number): {suit: string; card: number; };   //函数类型声明
function pickCard(x): any {         //函数声明及实现。因为同名函数只能有一个实现，所以重载函数的所有逻辑只能放在一个函数体内
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}
```
