let myAdd: (x, y) => number = function (x: number, y: number) { return x + y }

function buildName(firstName: string, ...restOfName: string[]) {
    //console.log(restOfName.length)
    return firstName + " " + restOfName.join("")
}
//let employeeName = buildName("Joseph", "Samuel", "Lucas", "Mike")
let employeeName = buildName("Joseph")

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


interface Card {
    suit: string;
    card: number;
}

interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card;
}

let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function (this: Deck) {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

console.log("card: " + pickedCard.card + " of " + pickedCard.suit);

let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: {suit: string; card: number; }[]): number
function pickCard(x: number): {suit: string; card: number; }
function pickCard(x): any {
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
