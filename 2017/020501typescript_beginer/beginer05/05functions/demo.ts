let myAdd: (x, y) => number = function (x: number, y: number) { return x + y }

function buildName(firstName: string, ...restOfName: string[]) {
    console.log(restOfName.length)
    return firstName + " " + restOfName.join("")
}
let employeeName = buildName("Joseph", "Samuel", "Lucas", "Mike")

