interface LabeledValue {
    label: string
}

function printLabel(labeledObj: LabeledValue) {
    console.log(labeledObj.label)
}

let myObj = { size: 10, label: "Size 10 Object" }
printLabel(myObj)

interface Rect {
    width: number
    height: number
    color?: string
}
let rect1: Rect = { width: 100, height: 100 }
let rect2: Rect = { width: 100, height: 100, color: "red" }

interface Point {
    readonly x: number
    readonly y: number
}
let p1: Point = { x: 10, y: 20 }
//p1.x = 5 只读属性初始化后不能再修改
let roa: ReadonlyArray<number> = [1, 2, 3, 4]   //只读数组

interface SquareConfig {
    color?: string
    width: number
}

function createSquare(config: SquareConfig) {
    console.log(config.color)
}

createSquare({ color: "red", width: 100 })
let sconf = { colour: "blue", width: 100, size: 100 }
createSquare(sconf)

interface SearchFunc {
    (source: string, subString: string): boolean
}

let mySearch1: SearchFunc = function (src: string) {
    return true;
}

interface IndexableNumberIndex {
    [i: number]: string
}
let ini1: IndexableNumberIndex = ["abc", "bcd"]
console.log(ini1[0])
let ini2: IndexableNumberIndex = {}
ini2[0] = "abc2"
console.log(ini2[0])

interface IndexableStringIndex {
    readonly [s: string]: string
    name?: string
}
let isi2: IndexableStringIndex = { a: "a" }
//isi2["a"] = "a"
isi2.name = "unknown"
console.log(isi2.a)
console.log(isi2.name)

class Animal {
    name: string;
}
class Dog extends Animal {
    breed: string;
}

interface TwoIndexTypes {
    [x: number]: Dog;
    [x: string]: Animal;
}

interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape {
    sideLength: number;
}

interface Square extends PenStroke {
    sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;



class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control {
    select() { }
}

class MyImage {
    private state: any;
    select() { }
}

let myCtl1: SelectableControl = new Button()
//let myCtl3: SelectableControl = new MyImage()
