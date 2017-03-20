# 类

## 第一个类

```ts
class Greeter {         //class关键字；首字母大写的类名
    greeting: string    //属性。默认为public
    constructor(msg: string) {  //constructor关键字声明构造函数，在创建此类实例时会调用。
        this.greeting = msg     //this关键字访问本实例
    }
    greet() {       //方法。
        return `Hello, ${this.greeting}!`
    }
}

let greeter = new Greeter("world")  //new关键字创建新实例
console.log(greeter.greet())    //通过实例调用方法
```

## 继承

```ts
class Animal {      //基类
    name: string    //name属性
    constructor(name: string) {     //构造函数
        this.name = name
    }
    move(distance: number = 0) {    //move方法
        console.log(`${this.name} moved ${distance}m.`)
    }
}

class Horse extends Animal {    //extends关键字从基类继承
    constructor(name: string) { //构造函数
        super(name)             //必须用super关键字调用父类构造函数
    }
    move(distance: number = 50) {   //覆盖父类的同名方法
        console.log("Galloping...")
        super.move(distance)    //super关键字调用父类方法
    }
    neigh() {   //子类独有的方法
        console.log("Huihui...")
    }
}

let sam:Animal = new Horse("Sam")   //Animal类型变量可以指向其子类Horse对象
let tom:Horse = new Horse("Tom")    //Horse类型变量指向Horse对象
sam.move()  //outputs Galloping... 虽然是Animal类型变量，但真实对象时Horse类型所以会调用Horse类的方法
tom.move(60)    //outputs Galloping... 调用Horse类的方法
//sam.neigh()   //虽然sam是Horse类对象，但是变量类型是Animal类型，是无法通过这个变量调用neigh这个子类定义的方法
tom.neigh() //可以调用Horse类的方法
```

## Public、Private、Protected 修饰符

### 默认是public

Typescript中没有修饰符时默认是public，这样的成员可以在外部访问

### 理解private

* 当成员被标记为private时，就只能在声明它的类中才能访问。
* **接口interface**的成员不能标记为private。
* private及protected对类型兼容的影响  
  当比较两个类的类型时，要满足以下条件才认为是兼容的：  
  * 所有同名成员的类型都是兼容的。
  * 如果存在只在一个类中出现的成员，即使兼容也只能是单向兼容
  * 所有的private成员都是来自于同一处声明（也就是继承自同一个类）

#### 双向兼容

```ts
class Animal {  //没有private成员
    name: string;   //同名属性
    constructor(theName: string) { this.name = theName; }
    move() { }
}

class Employee {   //没有private成员
    name: string;  //同名属性
    constructor(theName: string) { this.name = theName; }
    move(a: number = 0) { }     //方法兼容
}

let animal = new Animal("Goat");
let employee = new Employee("Bob");

employee = animal;  //所有成员都一样；成员互相兼容；没有private成员
animal = employee;  //两种类型被认为是互相兼容的
```

#### 单向兼容

```ts
class Animal {  //没有private成员
    name: string;   //同名属性
    constructor(theName: string) { this.name = theName; }
    move() { }  //多出来的方法
}

class Employee {    //没有private成员
    name: string;   //同名属性
    constructor(theName: string) { this.name = theName; }
}

let animal = new Animal("Goat");
let employee = new Employee("Bob");

employee = animal;      //因为animal中有Employee要求的所有成员，所以animal可以被赋给employee
//animal = employee;    //因为employee中没有animal要求的move方法，所以employee不可以赋值给animal
```

#### 独立的private成员导致的不兼容

```ts
class Animal {
    private name: string;   //私有成员name
    constructor(theName: string) { this.name = theName; }
}

class Employee {
    private name: string;   //私有成员name
    constructor(theName: string) { this.name = theName; }
}

let animal = new Animal("Goat");
let employee = new Employee("Bob");

//employee = animal;        //各自有一个私有成员name，所以无法互相赋值
//animal = employee;
```

#### 来自于同一个声明的private成员，仍然兼容

```ts
class Animal {
    private name: string;   //私有成员name
    constructor(theName: string) { this.name = theName; }
}

class Monkey extends Animal {   //从Animal继承
    constructor(theName: string) { super(theName) }
}

class Bird extends Animal {     //从Animal继承
    constructor(theName: string) { super(theName) }
}

let monkey = new Monkey("Tom");
let bird = new Bird("Bob");

bird = monkey       //private成员来自于同一个声明，所以可以兼容
monkey = bird
```

### 理解protected

* protected成员在派生类中仍然可以访问
* 构造函数也可以用protected修饰。一般用于不想被实例化的基类，因为构造函数被protected修饰了，那么就只有通过子类才能new了。

## readonly修饰符

类中的属性可以用readonly修饰，只读属性只能在构造函数中初始化

## 通过构造函数的参数声明属性

```ts
class Person {
    constructor(private name: string) { }   //构造函数的参数前增加访问限定符（public、private、readonly等），只能是构造函数的参数才能这样
    hi() {
        console.log(`Hi,${this.name}`)  //相当于声明了一个属性，并赋了初始值。在类的其它地方就可以直接使用。
    }
}
```

## 存取器

```ts
class Person {
    constructor(private _name: string) { }  //通过构造函数的参数声明了一个属性来保存实际的值
    hi() {
        console.log(`Hi,${this.name}`)
    }
    get name(): string {        //get关键字，函数名可以作为属性读取了
        return this._name   //返回实际的值。如果这儿误用了this.name，那么就会因为无尽递归导致堆栈溢出出错。
    }
    set name(newName: string) { //set关键字，函数名可以作为属性写入了
        this._name = newName    //写入值。如果只有get没有set那么就只能读；如果只有set没有get那么就只能写
    }
}
let p = new Person("Wangwu")
p.hi()  //outputs Wangwu
p.name = "Lisi" //写新值
p.hi()  //outputs Lisi
```

## 静态属性

关键字static修饰；静态成员存在于类上；访问时前面加类名。

## 抽象方法和抽象类

### 抽象方法

* 类中有abstract关键字修饰的方法就是抽象方法
* 抽象方法只能在派生类中实现

### 抽象类

* 有abstract关键字修饰的类就是抽象类
* 如果某个类中有抽象方法，那么类前面也必须有abstract关键字修饰
* 抽象类可以没有抽象方法
* 抽象类不能实例化

## 高级技巧

### 利用typeof实现工厂模式

```ts
class Animal {      //基类
    protected name: string;
    constructor(theName: string) { this.name = theName; }
    move() { }      //虽然要被覆盖，但是因为需要new实例，所以不能是abstract
}

class Monkey extends Animal {   //派生类
    constructor(theName: string) { super(theName) }
    move() {    //覆盖基类方法
        console.log(`${this.name} run with two legs.`)
    }
}

class Bird extends Animal {     //派生类
    constructor(theName: string) { super(theName) }
    move() {        //覆盖基类方法
        console.log(`${this.name} run with two wings.`)
    }
    fly() {
        console.log(`${this.name} fly in the sky.`)
    }
}

function buildAnimal(maker: typeof Animal, name: string) {  //使用Animal及派生类的类型作为参数
    return new maker(name)      //构造一个真正的对象
}

let monkey = buildAnimal(Monkey, "Tom")     //Monkey类作为类型参数；会构造出一个Monkey对象，但是monkey本身还是Animal类型的
let bird = buildAnimal(Bird, "Bob")     //Bird类作为类型参数；会构造出一个Bird对象
monkey.move()       //会调用monkey的move方法
bird.move()         //会调用bird的move方法
//bird.fly()        //Error bird变量是animal类型的，无法看到bird中定义的fly方法
```

### 类也可以作为接口使用

接口可以从类扩展。