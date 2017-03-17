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
