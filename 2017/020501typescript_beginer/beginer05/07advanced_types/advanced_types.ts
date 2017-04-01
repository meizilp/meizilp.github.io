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
