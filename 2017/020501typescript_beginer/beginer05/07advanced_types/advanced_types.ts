function padLeft(value: string, padding: any) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}

console.log(padLeft("Hello world", 1)); // returns "    Hello world"
console.log(padLeft("Hello world", "S:")); // returns "    Hello world"

function fixed(name: string | null, epithet: string): string {
    name = name || "default"
    return name.charAt(0) + '.  the ' + epithet; // ok
}

type Tree<T> = {
    value: T;
    left: Tree<Tree<T>>;
    right: Tree<T>;
}

type Yikes = { s: Array<Yikes> };
//type Yikes2 = Array<Yikes2>; 

type Alias = { num: number }
interface Interface {
    num: number;
}
declare function aliased(arg: Alias): Alias;
declare function interfaced(arg: Interface): Interface;


interface Square {
    kind: "square";
    size: number;
}
interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}
interface Circle {
    kind: "circle"
    radius: number
}

type Shape = Square | Rectangle | Circle;

function assertNever(x: never): never {
    throw new Error("Unexpected object: " + x);
}

function area(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
        default: return assertNever(s);
    }
}

let circle: Circle = { kind: "circle", radius: 4 }
console.log(`Area:${area(circle)}`)

interface Polygon {
    kind: "polygon" | "rectangle" | "square"
}

class BasicCalculator {
    protected value: number
    constructor(initValue: number) {
        this.value = initValue
    }
    public addReturnBasic(operand: number): BasicCalculator {
        this.value += operand
        return this
    }
    public addReturnThis(operand: number): this {
        this.value += operand
        return this
    }
    public currentValue() {
        return this.value
    }
}

class AdvancedCalculator extends BasicCalculator {
    public mul(operand: number) {
        this.value *= operand
        return this
    }
}

let vb = new BasicCalculator(2)
    .addReturnBasic(10)
//.mul(3)
console.log(vb.currentValue())
let va = new AdvancedCalculator(3)
    .addReturnThis(2)
    .mul(3)
console.log(va.currentValue())


interface Person {
    name: string;
    age: number;
}

let person: Person = {
    name: 'Jarid',
    age: 35
};

let a: keyof Person

function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
    return o[name]; // o[name] is of type T[K]
}

/* 
 * 两个泛型变量T、K，其中K是T的公共属性名称联合类型；
 * @param o 要读取属性值的对象
 * @param names 要读取的属性名称数组
 */
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
    return names.map(n => o[n]);
}

let strings = pluck(person, ['age']);
console.log(strings.length)
console.log(strings.join(","))

interface Map2<T> {
    [key: string]: T;
}
let keys: keyof Map2<number>; // string
let value: Map2<number>['foo']; // number

let sym1 = Symbol();      //通过Symbol构造函数创建
let sym2 = Symbol("key"); //可以指定名称
let sym3 = Symbol("key"); //sym2 === sym3是false，虽然他们有同样的key；Symbol是不可变的、唯一的
let obj = {
    [sym1]: "value"      //symbol可以像字符串一样当作对象的属性名
};
console.log(obj[sym1]); // "value"。获取symbol的属性值时只能通过[]来获取

class C {
    [sym2]() {
        return "Something";
    }
}

let c = new C();
let sth = c[sym2](); // 

console.log(C[Symbol.hasInstance](c))

let list = ['four', 'five', 'six'];
for (let i in list) {
    console.log(i); // 0, 1, 2,
}
for (let i of list) {
    console.log(i); // 'four', 'five', 'six'
}

let pets = new Set(["Cat", "Dog", "Hamster"]);
pets["species"] = "mammals";

for (let pet in pets) {
    console.log(pet); // "species"
}
for (let pet of pets) {
    console.log(pet); // "Cat", "Dog", "Hamster"
}
