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
