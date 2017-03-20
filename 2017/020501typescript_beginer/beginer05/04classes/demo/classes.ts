class Animal {
    protected name: string;
    constructor(theName: string) { this.name = theName; }
    move() { }
}

class Monkey extends Animal {
    constructor(theName: string) { super(theName) }
    move() {
        console.log(`${this.name} run with two legs.`)
    }
}

class Bird extends Animal {
    constructor(theName: string) { super(theName) }
    move() {
        console.log(`${this.name} run with two wings.`)
    }
    fly() { 
        console.log(`${this.name} fly in the sky.`)
    }
}

function buildAnimal(maker: typeof Animal, name: string) {
    return new maker(name)
}

let monkey = buildAnimal(Monkey, "Tom")
let bird = buildAnimal(Bird, "Bob")
monkey.move()
bird.move()
//bird.fly()




class Person {
    constructor(private _name: string) { }
    hi() {
        console.log(`Hi,${this.name}`)
    }
    get name(): string {
        return this._name
    }
    set name(newName: string) {
        this._name = newName
    }
}
let p = new Person("Wangwu")
p.hi()
p.name = "Lisi"
p.hi()

abstract class MyAnimal {
    makeSound(): void { }
    move(): void {
        console.log("roaming the earth...");
    }
}
