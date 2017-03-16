for (let i = 0; i < 3; ++i) {
    var j = i * 10
    setTimeout(function () {
        console.log(`i:${i} j:${j}`)
    }, 100);
}

let [first, ...rest] = [1, 2, 3, 4]
console.log(first)
console.log(rest)

let o = { a: "a", b: 6, c: "c", d: "d" }
let { a, c, ...remain } = o
console.log(c)
console.log(remain)

let d: { da: number, db: string, dc?: string }
d = { da: 100, db: "bb" }
let { da, db = "db", dc = "dc" } = d
console.log(db)
console.log(dc)

function f1({ a, b }) {
    console.log(a)
    console.log(b)
}
f1({ a: "a1", b: "b1" })

function f2({ a, b }: { a: string, b?: string }) {     //参数直接被解构为变量a和变量b。对象的b属性是可选的
    console.log(a)
}
f2({ a: "a2" })    //outputs: a2。属性b是可选的，所以对象可以不用传入

function f3({ a, b = "nothing" }: { a: string, b?: string } = { a: "default_a" }) {
    console.log(a)
    console.log(b)
}
f3()
f3({ a: "a3" })
f3({ a: "a3", b: "b3" })
